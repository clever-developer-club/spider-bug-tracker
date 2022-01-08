const express = require('express')
const Answer = require('../models/Answer')
const answerCtrl = require('../controllers/answer.controller')
const { getDocuments, getDocumentbyId } = require('../middleware/modelResults')
const passport= require('../config/passport_config')
const { checkAnswerPermissions, checkMemberPermissions } = require('../middleware/userPermission')
const { getQuestion, getAnswer } = require('../middleware/resourceHelpers')
const { answerAuthorMiddleware, answerMiddleware } = require('../middleware/middlewareComposer')

const router = express.Router()

router.route("/")
    .post(
		getQuestion,
        answerCtrl.addAnswer
    )

router.route("/:answerId")
	.patch(
		answerAuthorMiddleware,
        answerCtrl.editAnswer
    )
	.delete(
		getQuestion,
		answerAuthorMiddleware,
        answerCtrl.deleteAnswer
    )

router.route("/:answerId/likes")
	.post(
		answerMiddleware,
		answerCtrl.likeAnswer
	)
	.delete(
		answerMiddleware,
		answerCtrl.unlikeAnswer
	)


module.exports = router