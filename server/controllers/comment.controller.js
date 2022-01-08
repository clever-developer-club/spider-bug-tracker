const Bug = require("../models/Bug")
const Comment = require("../models/Comment")
const getError = require('../utils/dbErrorHandler')
const { commentPopulate } = require("../utils/populateObjects")

module.exports = {

	// @desc      Create Comment
    // @route     POST /api/v1/projects/:projectId/bugs/:bugsId/comments[/:commentId]
    // @access    Private

	addComment : async(req,res) => {
		try{

			let comment = new Comment({
				author: req.user._id,
				text: req.body.text,
				likes: [],
				replies: []
			})

			let parent,type

			if(req.params.commentId){
				parent = await Comment.findById(req.params.commentId)
				type = "Comment"
			}else{
				parent = await Bug.findById(res.locals.bugId)
				type = "Bug"
			}

			if(!parent){
				return res.status(400).json({
					error: true,
					message:  `No such ${type} exists.`
				})
			}

			parent.addReply(comment._id)
			comment.parent_id = parent._id
			comment.parent_model = type
			
			await parent.save()
			await comment.save()

			return res.status(201).json({
				error: false,
				data: await Comment.populate(comment,commentPopulate),
				message: "Comment Added Successfully."
			})

        }catch(error){
			let errMsg = getError(error)
            return res.status(400).json({
                error: true,
                message:  errMsg.length > 0 ? errMsg : "Could not add comment."
            })
        }
	},

	// @desc      Update Comment
    // @route     PATCH /api/v1/projects/:projectId/bugs/:bugsId/comments/:commentId
    // @access    Private

	editComment : async(req,res) => {
		try{

			let comment = res.locals.comment
			
			comment.setText(req.body.text)
			
			await comment.save()
			return res.status(200).json({
				error: false,
				data: await Comment.populate(comment,commentPopulate),
				message: "Comment Edited Successfully."
			})

        }catch(error){
			let errMsg = getError(error)
            return res.status(400).json({
                error: true,
                message:  errMsg.length > 0 ? errMsg : "Could not edit comment."
            })
        }
	},

	// @desc      Delete Comment
    // @route     DELETE /api/v1/projects/:projectId/bugs/:bugsId/comments/:commentId
    // @access    Private

	deleteComment : async(req,res) => {
		try{

			let comment = res.locals.comment

			let parent,type

			if(comment.parent_model == 'Comment'){
				parent = await Comment.findById(comment.parent_id)
				type = "Comment"
			}else{
				parent = await Bug.findById(comment.parent_id)
				type = "Bug"
			}

			if(!parent){
				return res.status(400).json({
					error: true,
					message:  `Invalid Parent ${type}.`
				})
			}

			parent.removeReply(comment._id)
			await parent.save()

			await comment.deleteOne()

			return res.status(200).json({
				error: false,
				data: await Comment.populate(comment,commentPopulate),
				message: "Comment Deleted Successfully."
			})

        }catch(error){
			let errMsg = getError(error)
            return res.status(400).json({
                error: true,
                message:  errMsg.length > 0 ? errMsg : "Could not delete comment."
            })
        }
	},

	// @desc      Like Comment
    // @route     POST /api/v1/projects/:projectId/bugs/:bugsId/comments/:commentId/likes
    // @access    Private

	likeComment: async(req,res) => {
		try{
			
			let comment = res.locals.comment

			comment.addLike(req.user._id)
			await comment.save()

			return res.status(200).json({
				error: false,
				data: await Comment.populate(comment,commentPopulate),
				message: "Comment Liked Successfully."
			})

		}catch(error){
			let errMsg = getError(error)
			return res.status(400).json({
				error: true,
				message:  errMsg.length > 0 ? errMsg : "Could not like comment."
			})
		}
	},

	// @desc      Unlike Comment
    // @route     DELETE /api/v1/projects/:projectId/bugs/:bugsId/comments/:commentId/likes
    // @access    Private

	unlikeComment: async(req,res) => {
		try{
			
			let comment = res.locals.comment

			comment.removeLike(req.user._id)
			await comment.save()

			return res.status(200).json({
				error: false,
				data: await Comment.populate(comment,commentPopulate),
				message: "Comment Unliked Successfully."
			})

		}catch(error){
			let errMsg = getError(error)
			return res.status(400).json({
				error: true,
				message:  errMsg.length > 0 ? errMsg : "Could not unlike comment."
			})
		}
	},

	// @desc      Get Comment by Id
    // @route     GET /api/v1/projects/:projectId/bugs/:bugsId/comments/:commentId
    // @access    Private

    getCommentbyId : async (req,res) => {
        if(res.results.err){
            return res.status(404).json(res.results)
        }else if(res.results.data == null){
            return res.status(404).json({
                err : true,
                metadata : {
                    msg : "No Comment found."
                }
            })
        }else{
            return res.status(200).json(res.results)
        }
    }

}