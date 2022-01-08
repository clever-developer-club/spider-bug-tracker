const Project = require('../models/Project')
const getError = require('../utils/dbErrorHandler')
const {uploadImages, deleteImages} = require('../utils/multipleImageOperations')
const { projectPopulate } = require('../utils/populateObjects')

module.exports = {

    // @desc      Create Project
    // @route     POST /api/v1/projects
    // @access    Private

    createProject : async (req,res) => {
        try{

            const project = new Project({
                name: req.body.name,
				client: req.body.client,
				description: req.body.description || "",
				deadline: req.body.deadline,
				duration: req.body.duration,
				tech: req.body.tech || [],
				leads: req.body.leads,
				members: req.body.members
            })

			project.addLead(req.user._id)
			project.addMember(req.user._id)

            await project.save()

            return res.status(201).json({
                error: false,
                data: await Project.populate(project,projectPopulate),
                message: 'Project created successfully.'
            })

        }catch(error){
			let errMsg = getError(error)
            return res.status(400).json({
                error: true,
                message:  errMsg.length > 0 ? errMsg : "Could not create project."
            })
        }
    },

    // @desc      Add Leads to Projects
    // @route     POST /api/v1/projects/:id/leads
    // @access    Private

    addLeadstoProject : async(req,res) => {
        try{

            let project = res.locals.project
            project.addLeads(req.body.leads)

            await project.save()
			return res.status(200).json({
				error: false,
				data: await Project.populate(project,projectPopulate),
				message: 'Project Leads added successfully.'
			})

        }catch(error){
			let errMsg = getError(error)
            return res.status(400).json({
                err: true,
                msg: errMsg.length > 0 ? errMsg : "Could not update project."
            })
        }
    },

	// @desc      Add Members to Projects
    // @route     POST /api/v1/projects/:id/members
    // @access    Private

    addMemberstoProject : async(req,res) => {
        try{

            let project = res.locals.project
            project.addMembers(req.body.members)

            await project.save()
			return res.status(200).json({
				error: false,
				data: await Project.populate(project,projectPopulate),
				message: 'Project Members added successfully.'
			})

        }catch(error){
			let errMsg = getError(error)
            return res.status(400).json({
                err: true,
                msg: errMsg.length > 0 ? errMsg : "Could not update project."
            })
        }
    },

    // @desc      Delete Leads from projects
    // @route     DELETE /api/v1/projects/:id/leads
    // @access    Private

    deleteLeadsfromProject : async(req,res) => {
        try{

            let project = res.locals.project
            project.removeLeads(req.body.leads)

            await project.save()
			return res.status(200).json({
				error: false,
				data: await Project.populate(project,projectPopulate),
				message: 'Project Leads removed successfully.'
			})

        }
        catch(error){
			let errMsg = getError(error)
            return res.status(400).json({
                err: true,
                msg: errMsg.length > 0 ? errMsg : "Could not update project."
            })
        }
    },

	// @desc      Delete Members from projects
    // @route     DELETE /api/v1/projects/:id/members
    // @access    Private

    deleteMembersfromProject : async(req,res) => {
        try{

            let project = res.locals.project
            project.removeMembers(req.body.members)

            await project.save()
			return res.status(200).json({
				error: false,
				data: await Project.populate(project,projectPopulate),
				message: 'Project Members removed successfully.'
			})

        }catch(error){
			let errMsg = getError(error)
            return res.status(400).json({
                err: true,
                msg: errMsg.length > 0 ? errMsg : "Could not update project."
            })
        }
    },

    // @desc      Update Project
    // @route     PATCH /api/v1/projects/:projectId
    // @access    Private

    updateProject : async (req,res) => {
        try{

			let project = res.locals.project
        
            let updateFields = {                    
                name: req.body.name,
				client: req.body.client,
				description: req.body.description,
				deadline: req.body.deadline,
				duration: req.body.duration,
				tech: req.body.tech,
				status: req.body.status
            }

            for (const [key, value] of Object.entries(updateFields)) {
                if (value) {
					project[key] = value
				}
            }

			await project.save()

			return res.status(200).json({
				err: false,
				data: await Project.populate(project,projectPopulate),
				msg: "Project Updated Successfully."
			})
        
		}catch(error){
			let errMsg = getError(error)
            return res.status(400).json({
                error: true,
                message:  errMsg.length > 0 ? errMsg : "Could not update project."
            })
        }
    },

    // @desc      Delete project
    // @route     DELETE /api/v1/projects/:id
    // @access    Private

    deleteProject : async (req,res) => {
        try{
           
            let project = res.locals.project
        	await project.deleteOne()
            return res.status(200).json({
                error: false,
                data : await Project.populate(project,projectPopulate),
                message: "Project Deleted Successfully."
            })    
        }
        catch(error){
			console.log(error)
            let errMsg = getError(error)
            return res.status(400).json({
                error: true,
                message:  errMsg.length > 0 ? errMsg : "Could not delete project."
            })
        }
    },

    // @desc      Get Projects
    // @route     GET /api/v1/projects
    // @access    Public

    getProjects : async (req,res) => {
        if(res.results.err){
            return res.status(404).json(res.results)
        }else if(res.results.metadata.count == 0){
            return res.status(404).json({
                err : true,
                metadata : {
                    msg : "No projects found."
                }
            })
        }else{
            return res.status(200).json(res.results)
        }
    },

    // @desc      Get Projects by Id
    // @route     GET /api/v1/projects/:id
    // @access    Public

    getProjectbyId : async (req,res) => {
        if(res.results.err){
            return res.status(404).json(res.results)
        }else if(res.results.data == null){
            return res.status(404).json({
                err : true,
                metadata : {
                    msg : "No project found."
                }
            })
        }else{
            return res.status(200).json(res.results)
        }
    }

}