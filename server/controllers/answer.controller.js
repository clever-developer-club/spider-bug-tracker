const Answer = require('../models/Answer')
const getError = require('../utils/dbErrorHandler')
const { answerPopulate } = require('../utils/populateObjects')

module.exports = {

	// @desc      Create Answer
    // @route     POST /api/v1/discussions/:questionId/answers
    // @access    Private

	addAnswer: async(req,res) => {
		try{
			
			let answer = new Answer ({
				author: req.user._id,
				text: req.body.text,
				likes: [],
				questionId: req.params.questionId
			})

			let question = res.locals.question

			question.addAnswer(answer._id)

			await question.save()
			await answer.save()

			return res.status(201).json({
                error: false,
                data: await Answer.populate(answer,answerPopulate),
                message: 'Answer created successfully.'
            })

		}catch(error){
			let errMsg = getError(error)
			return res.status(400).json({
				error: true,
				message:  errMsg.length > 0 ? errMsg : "Could not add answer."
			})
		}
	},

	// @desc      Edit Answer
    // @route     PATCH /api/v1/discussions/:questionId/answers/:answerId
    // @access    Private

	editAnswer: async(req,res) => {
		try{
			
			let answer = res.locals.answer

			answer.setText(req.body.text)
			
			await answer.save()
			return res.status(200).json({
				error: false,
				data: await Answer.populate(answer,answerPopulate),
				message: "Answer Edited Successfully."
			})

		}catch(error){
			let errMsg = getError(error)
			return res.status(400).json({
				error: true,
				message:  errMsg.length > 0 ? errMsg : "Could not edit answer."
			})
		}
	},

	// @desc      Delete Answer
    // @route     DELETE /api/v1/discussions/:questionId/answers/:answerId
    // @access    Private

	deleteAnswer: async(req,res) => {
		try{
			
			let answer = res.locals.answer

			let question = res.locals.question

			question.removeAnswer(answer._id)
			await question.save()
			
			await answer.deleteOne()

			return res.status(200).json({
				error: false,
				data: await Answer.populate(answer,answerPopulate),
				message: "Answer deleted Successfully."
			})

		}catch(error){
			let errMsg = getError(error)
			return res.status(400).json({
				error: true,
				message:  errMsg.length > 0 ? errMsg : "Could not delete answer."
			})
		}
	},

	// @desc      Like Answer
    // @route     POST /api/v1/discussions/:questionId/answers/:answerId/likes
    // @access    Private

	likeAnswer: async(req,res) => {
		try{
			
			let answer = res.locals.answer

			answer.addLike(req.user._id)
			await answer.save()

			return res.status(200).json({
				error: false,
				data: await Answer.populate(answer,answerPopulate),
				message: "Answer Liked Successfully."
			})

		}catch(error){
			let errMsg = getError(error)
			return res.status(400).json({
				error: true,
				message:  errMsg.length > 0 ? errMsg : "Could not like answer."
			})
		}
	},

	// @desc      Unlike Answer
    // @route     DELETE /api/v1/discussions/:questionId/answers/:answerId/likes
    // @access    Private

	unlikeAnswer: async(req,res) => {
		try{
			
			let answer = res.locals.answer

			answer.removeLike(req.user._id)
			await answer.save()

			return res.status(200).json({
				error: false,
				data: await Answer.populate(answer,answerPopulate),
				message: "Answer Unliked Successfully."
			})

		}catch(error){
			let errMsg = getError(error)
			return res.status(400).json({
				error: true,
				message:  errMsg.length > 0 ? errMsg : "Could not unlike answer."
			})
		}
	}

}