const Question = require('../models/Question')
const getError = require('../utils/dbErrorHandler')
const { questionPopulate } = require('../utils/populateObjects')

module.exports = {

	// @desc      Create Question
    // @route     POST /api/v1/discussions
    // @access    Private

	addQuestion: async(req,res) => {
		try{
			
			let question = new Question ({
				author: req.user._id,
				text: req.body.text,
				tags: req.body.tags,
				likes: [],
				answers: []
			})

			await question.save()

			return res.status(201).json({
                error: false,
                data: await Question.populate(question,questionPopulate),
                message: 'Question created successfully.'
            })

		}catch(error){
			console.log(error)
			let errMsg = getError(error)
			return res.status(400).json({
				error: true,
				message:  errMsg.length > 0 ? errMsg : "Could not add question."
			})
		}
	},

	// @desc      Edit Question
    // @route     PATCH /api/v1/discussions/:questionId
    // @access    Private

	editQuestion: async(req,res) => {
		try{
			
			let question = res.locals.question

			question.setText(req.body.text)
			question.markAcceptedAnswer(req.body.acceptedAnswer)
			question.addTags(req.body.tags)
			
			await question.save()
			return res.status(200).json({
				error: false,
				data: await Question.populate(question,questionPopulate),
				message: "Question Edited Successfully."
			})

		}catch(error){
			let errMsg = getError(error)
			return res.status(400).json({
				error: true,
				message:  errMsg.length > 0 ? errMsg : "Could not edit question."
			})
		}
	},

	// @desc      Delete Question
    // @route     DELETE /api/v1/discussions/:questionId
    // @access    Private

	deleteQuestion: async(req,res) => {
		try{
			
			let question = res.locals.question

			await question.deleteOne()

			return res.status(200).json({
				error: false,
				data: await Question.populate(question,questionPopulate),
				message: "Question deleted Successfully."
			})

		}catch(error){
			let errMsg = getError(error)
			return res.status(400).json({
				error: true,
				message:  errMsg.length > 0 ? errMsg : "Could not delete question."
			})
		}
	},

	// @desc      Like Question
    // @route     POST /api/v1/discussions/:questionId/likes
    // @access    Private

	likeQuestion: async(req,res) => {
		try{
			
			let question = res.locals.question

			question.addLike(req.user._id)
			await question.save()

			return res.status(200).json({
				error: false,
				data: await Question.populate(question,questionPopulate),
				message: "Question Liked Successfully."
			})

		}catch(error){
			let errMsg = getError(error)
			return res.status(400).json({
				error: true,
				message:  errMsg.length > 0 ? errMsg : "Could not like question."
			})
		}
	},

	// @desc      Unlike Question
    // @route     DELETE /api/v1/discussions/:questionId/likes
    // @access    Private

	unlikeQuestion: async(req,res) => {
		try{
			
			let question = res.locals.question

			question.removeLike(req.user._id)
			await question.save()

			return res.status(200).json({
				error: false,
				data: await Question.populate(question,questionPopulate),
				message: "Question Unliked Successfully."
			})

		}catch(error){
			let errMsg = getError(error)
			return res.status(400).json({
				error: true,
				message:  errMsg.length > 0 ? errMsg : "Could not unlike question."
			})
		}
	},

	// @desc      Get Questions
    // @route     GET /api/v1/discussions
    // @access    Private

    getQuestions : async (req,res) => {
        if(res.results.err){
            return res.status(404).json(res.results)
        }else if(res.results.metadata.count == 0){
            return res.status(404).json({
                err : true,
                metadata : {
                    msg : "No Questions found."
                }
            })
        }else{
            return res.status(200).json(res.results)
        }
    },

    // @desc      Get Questions by Id
    // @route     GET /api/v1/discussions/:questionId
    // @access    Private

    getQuestionbyId : async (req,res) => {
        if(res.results.err){
            return res.status(404).json(res.results)
        }else if(res.results.data == null){
            return res.status(404).json({
                err : true,
                metadata : {
                    msg : "No Question found."
                }
            })
        }else{
            return res.status(200).json(res.results)
        }
    }

}