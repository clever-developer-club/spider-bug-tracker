const Bug = require('../models/Bug')
const Project = require('../models/Project')
const User = require('../models/User')
const getError = require('../utils/dbErrorHandler')
const { uploadImages, deleteImages } = require('../utils/multipleImageOperations')
const { sendAssignBugEmail } = require('../utils/sendEmail')
const { bugPopulate } = require('../utils/populateObjects')

const frontEndURL = process.env.FRONTEND_URL

module.exports = {

    // @desc      Create Bug
    // @route     POST /api/v1/[public][projects/:projectId]/bugs
    // @access    Private

    createBug : async (req,res) => {
        try{

            const bug = new Bug({
                title: req.body.title,
				description: req.body.description || "",
				deadline: req.body.deadline,
				severity: req.body.severity,
				priority: req.body.priority,
				createdBy: req.user._id,
				comments: []
            })

			let uploadedImages = await uploadImages(bug._id,"Bug",req.body.images)
                    
            let err_images = []
            for(let image of uploadedImages){
                if(!image){
                    err_images.push(image)
                }else{
                    bug.addImage(image)
                }
            }

			try{
				if(res.locals.project){
					bug.setPrivate()
					bug.setIssueId(res.locals.project.getBugCount() + 1)
					res.locals.project.addBug(bug._id)
					await res.locals.project.save()
				}else{
					bug.setPublic()
					bug.setIssueId(await Bug.getPublicBugCount() + 1)
				}

            	await bug.save()
            	return res.status(201).json({
                	error: false,
                	data: await Bug.populate(bug,bugPopulate),
                	message: 'Bug created successfully.',
					err_images: err_images.length == 0? null : err_images
            	})
			}catch(error){
				await deleteImages(bug.images)
				throw error
			}

        }
        catch(error){
			console.log(error)
			let errMsg = getError(error)
            return res.status(400).json({
                error: true,
                message:  errMsg.length > 0 ? errMsg : "Could not create bug."
            })
        }
    },

    // @desc      Add Images to bugs
    // @route     POST /api/v1/[public][projects/:projectId]/bugs/:bugId/images
    // @access    Private

    addImagestoBug : async(req,res) => {
        try{
        
			let bug = res.locals.bug;
			
            let uploadedImages = await uploadImages(bug._id,"Bug",req.body.images)
                    
            let err_images = []
            for(let image of uploadedImages){
                if(!image){
                    err_images.push(image)
                }else{
                    bug.addImage(image)
                }
            }

			await bug.save()
        	return res.status(200).json({
                error: false,
                data: await Bug.populate(bug,bugPopulate),
                message: err_images.length == 0? 'Images added successfully.' : 'Some Images were not added.',
                err_images: err_images.length == 0? null : err_images
            })
                    
			// deleteImages(success_images).then(() => {
			// 	return res.status(400).json({
			// 		err: true,
			// 		msg: "Could not upload images"
			// 	})
			// })

        }catch(error){
			console.log(error)
			let errMsg = getError(error)
            return res.status(400).json({
                error: true,
                message:  errMsg.length > 0 ? errMsg : "Can not update bug."
            })
        }
    },

    // @desc      Delete Images from bugs
    // @route     DELETE /api/v1/[public][projects/:projectId]/bugs/:bugId/images
    // @access    Private

    deleteImagesfromBug : async(req,res) => {
        try{
            
			let bug = res.locals.bug;

            let deletedImages = await deleteImages(req.body.images)
                   
            let err_images = []
            for(let image of deletedImages){
                if(!image){
                    err_images.push(image)
                }else{
                    bug.deleteImage(image)
                }
            }
                        
			await bug.save()
			return res.status(200).json({
				err: false,
				data : await Bug.populate(bug,bugPopulate),
				message: err_images.length == 0? 'Images deleted successfully.': 'Some images were not deleted.',
				err_images: err_images.length == 0? null : err_images
			})

        }catch(error){
			let errMsg = getError(error)
            return res.status(400).json({
                error: true,
                message:  errMsg.length > 0 ? errMsg : "Could not update bug."
            })
        }
    },

    // @desc      Update Bug
    // @route     PATCH /api/v1/[public][projects/:projectId]/bugs/:bugId
    // @access    Private

    updateBug : async (req,res) => {
        try{

			let bug = res.locals.bug
           
            let updateFields = {                    
                title: req.body.title,
				description: req.body.description,
				deadline: req.body.deadline,
				severity: req.body.severity,
				priority: req.body.priority,
				status: req.body.status
            }

            for (const [key, value] of Object.entries(updateFields)) {
                if (value) {
					bug[key] = value
				}
            }
			
			await bug.save()

			return res.status(200).json({
				err: false,
				data: await Bug.populate(bug,bugPopulate),
				msg: "Bug Updated Successfully."
			})
        
		}catch(error){
			console.log(error)
			let errMsg = getError(error)
            return res.status(400).json({
                error: true,
                message:  errMsg.length > 0 ? errMsg : "Could not update bug."
            })
        }
    },

	// @desc      Assign Bug
    // @route     POST /api/v1/[public][projects/:projectId]/bugs/:bugId
    // @access    Private

    assignBug : async (req,res) => {
        try{

            let bug = res.locals.bug

			if(bug.isPublic()){
				return res.status(400).json({
					error: true,
					message: "Public bug cannot be assigned."
				})
			}

			let user = await User.findById(req.body.user)

			if(!user){
				return res.status(400).json({
					error: true,
					message: "No such user exists."
				})
			}

			bug.assign(req.body.user)			
			await bug.save()

			let link = `${frontEndURL}/#/projects/${res.locals.project._id}/bugs/${bug._id}`
			await sendAssignBugEmail({
				user : user.name,
				email : user.email
			},res.locals.project.name,link)

			return res.status(200).json({
				error: false,
				data: await Bug.populate(bug,bugPopulate),
				message: "Bug Assigned Successfully."
			})

        }
        catch(error){
			console.log(error)
			let errMsg = getError(error)
            return res.status(400).json({
                error: true,
                message:  errMsg.length > 0 ? errMsg : "Could not assign bug."
            })
        }
    },

    // @desc      Delete bug
    // @route     DELETE /api/v1/[public][projects/:projectId]/bugs/:bugId
    // @access    Private

    deleteBug : async (req,res) => {
        try{
            
            let bug = res.locals.bug

			if(res.locals.project){
				res.locals.project.deleteBug(bug._id)
				await res.locals.project.save()
			}

			await bug.deleteOne()

            return res.status(200).json({
                err: false,
                data : await Bug.populate(bug,bugPopulate),
                msg: "Bug Deleted Successfully."
            })  
        }
        catch(error){
            let errMsg = getError(error)
            return res.status(400).json({
                error: true,
                message:  errMsg.length > 0 ? errMsg : "Could not delete bug."
            })
        }
    },

    // @desc      Get bugs
    // @route     GET /api/v1/[public][projects/:projectId]/bugs
    // @access    Public

    getBugs : async (req,res) => {
        if(res.results.err){
            return res.status(404).json(res.results)
        }else if(res.results.metadata.count == 0){
            return res.status(404).json({
                err : true,
                metadata : {
                    msg : "No bugs found."
                }
            })
        }else{
            return res.status(200).json(res.results)
        }
    },

    // @desc      Get bugs by Id
    // @route     GET /api/v1/[public][projects/:projectId]/bugs/:bugId
    // @access    Public

    getBugbyId : async (req,res) => {
        if(res.results.err){
            return res.status(404).json(res.results)
        }else if(res.results.data == null){
            return res.status(404).json({
                err : true,
                metadata : {
                    msg : "No bug found."
                }
            })
        }else{
            return res.status(200).json(res.results)
        }
    }

}