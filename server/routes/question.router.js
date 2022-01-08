const express = require('express')
const Question = require('../models/Question')
const questionCtrl = require('../controllers/question.controller')
const answerRouter = require('../routes/answer.router')
const { getDocuments, getDocumentbyId } = require('../middleware/modelResults')
const { setQuestionasResource, setQuestionId } = require('../middleware/paramHelpers')
const { questionMiddleware, questionAuthorMiddleware } = require('../middleware/middlewareComposer')
const { questionPopulate } = require('../utils/populateObjects')

const router = express.Router()

router.route("/")
	.get(
		getDocuments(
			Question,
			questionPopulate
		),
		questionCtrl.getQuestions
	)
    .post(
        questionCtrl.addQuestion
    )

router.route("/:questionId")
	.get(
		setQuestionasResource,
		getDocumentbyId(
			Question,
			questionPopulate
		),
		questionCtrl.getQuestionbyId
	)
	.patch(
		questionAuthorMiddleware,
        questionCtrl.editQuestion
    )
	.delete(
		questionAuthorMiddleware,
        questionCtrl.deleteQuestion
    )

router.route("/:questionId/likes")
	.post(
		questionMiddleware,
		questionCtrl.likeQuestion
	)
	.delete(
		questionMiddleware,
		questionCtrl.unlikeQuestion
	)

router.use(
	'/:questionId/answers',
	setQuestionId,
	answerRouter
)

module.exports = router