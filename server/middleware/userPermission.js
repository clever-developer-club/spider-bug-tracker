const Project = require("../models/Project")
const Bug = require("../models/Bug")

module.exports = {

	checkPublicBugPermissions: async (req,res,next) => {
		if(res.locals.bug && res.locals.bug.isPublic()){
			next()
		}else{
			res.status(400).json({
				error: true,
				message: "Permission denied to access specified bug."
			})
		}
	},

	checkPrivateBugPermissions: async (req,res,next) => {
		if(res.locals.project && res.locals.project.hasBug(res.locals.bugId)){
			next()
		}else{
			res.status(400).json({
				error: true,
				message: "Permission denied to access specified bug."
			})
		}
	},

	checkMemberPermissions : async (req,res,next) => {
		if(res.locals.project && res.locals.project.hasMember(req.user._id)){
			next()
		}else{
			res.status(400).json({
				error: true,
				message: "Permission denied to update specified project."
			})
		}
	},
	
	checkLeadPermissions : async (req,res,next) => {
		if(res.locals.project && res.locals.project.hasLead(req.user._id)){
			next()
		}else{
			res.status(400).json({
				error: true,
				message: "Permission denied to update specified project."
			})
		}
	},

	checkCreatorPermissions:  async (req,res,next) => {
		if(res.locals.bug && res.locals.bug.isCreator(req.user._id)){
			next()
		}else{
			res.status(400).json({
				error: true,
				message: "Permission denied to update specified bug."
			})
		}
	},

	checkCommentPermissions: async(req,res,next) => {
		if(res.locals.comment && res.locals.comment.isAuthor(req.user._id)){
			next()
		}else{
			res.status(400).json({
				error: true,
				message:  "Permission denied to edit specified comment."
			})
		}		
	},

	checkQuestionPermissions: async(req,res,next) => {
		if(res.locals.question && res.locals.question.isAuthor(req.user._id)){
			next()
		}else{
			res.status(400).json({
				error: true,
				message:  "Permission denied to edit specified question."
			})
		}		
	},

	checkAnswerPermissions: async(req,res,next) => {
		if(res.locals.answer && res.locals.answer.isAuthor(req.user._id)){
			next()
		}else{
			res.status(400).json({
				error: true,
				message:  "Permission denied to edit specified answer."
			})
		}		
	},

}