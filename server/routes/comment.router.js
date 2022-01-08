const express = require('express')
const Comment = require('../models/Comment')
const commentCtrl = require('../controllers/comment.controller')
const { getDocumentbyId } = require('../middleware/modelResults')
const { setCommentasResource } = require('../middleware/paramHelpers')
const { bugCreatorMiddleware, bugMiddleware } = require('../middleware/middlewareComposer')
const { commentMiddleware, commentAuthorMiddleware } = require('../middleware/middlewareComposer')
const { commentPopulate } = require('../utils/populateObjects')

const router = express.Router()

router.route(["/","/:commentId"])
    .post(
        commentCtrl.addComment
    )

router.route("/:commentId")
	.get(
		setCommentasResource,
		getDocumentbyId(
            Comment,
			commentPopulate
        ),
		commentCtrl.getCommentbyId
	)
	.patch(
		commentAuthorMiddleware,
        commentCtrl.editComment
    )
	.delete(
		commentAuthorMiddleware,
        commentCtrl.deleteComment
    )

router.route("/:commentId/likes")
	.post(
		commentMiddleware,
        commentCtrl.likeComment
    )
	.delete(
		commentMiddleware,
        commentCtrl.unlikeComment
    )

module.exports = router