const Project = require('../models/Project')
const Bug = require('../models/Bug')
const Question = require('../models/Question')
const Comment = require('../models/Comment')
const Answer = require('../models/Answer')

module.exports = {

	getProject: async (req,res,next) => {
		if(!res.locals.projectId){
			res.status(400).json({
				err: true,
				msg: "Project Id was not specified."
			})
			return;
		}

		let project = await Project.findById(res.locals.projectId)
		
		if(!project){
			res.status(400).json({
				error: true,
				message: "No such Project exists."
			})
		}else{
			res.locals.project = project
			next()
		}
	},

	getBug : async (req,res,next) => {
		if(!res.locals.bugId){
			res.status(400).json({
				err: true,
				msg: "Bug Id was not specified."
			})
			return;
		}

		let bug = await Bug.findById(res.locals.bugId)
		
		if(!bug){
			res.status(400).json({
				error: true,
				message: "No such Bug exists."
			})
		}else{
			res.locals.bug = bug
			next()
		}
	},

	getComment: async (req,res,next) => {
		if(!res.locals.commentId){
			res.status(400).json({
				err: true,
				msg: "Comment Id was not specified."
			})
			return;
		}

		let comment = await Comment.findById(res.locals.commentId)

		if(!comment){
			res.status(400).json({
				error: true,
				message:  "No such Comment exists."
			})
		}else{
			res.locals.comment = comment
			next()
		}
	},

	getQuestion: async (req,res,next) => {
		if(!res.locals.questionId){
			res.status(400).json({
				err: true,
				msg: "Question Id was not specified."
			})
			return;
		}

		let question = await Question.findById(res.locals.questionId)

		if(!question){
			res.status(400).json({
				error: true,
				message:  "No such Question exists."
			})
		}else{
			res.locals.question = question
			next()
		}
	},

	getAnswer: async (req,res,next) => {
		if(!res.locals.answerId){
			res.status(400).json({
				err: true,
				msg: "Answer Id was not specified."
			})
			return;
		}

		let answer = await Answer.findById(res.locals.answerId)

		if(!answer){
			res.status(400).json({
				error: true,
				message:  "No such Answer exists."
			})
		}else{
			res.locals.answer = answer
			next()
		}
	},


}