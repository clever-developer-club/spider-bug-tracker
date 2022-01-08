const express = require('express')
const bugCtrl = require('../controllers/bug.controller')
const commentRouter = require('./comment.router')
const { getDocuments, getDocumentbyId } = require('../middleware/modelResults')
const Bug = require('../models/Bug')
const { setBugasResource, setBugId, setBugIdsasFilter } = require('../middleware/paramHelpers')
const { bugCreatorMiddleware, bugMiddleware, bugAccessMiddleware } = require('../middleware/middlewareComposer')
const { bugPopulate } = require('../utils/populateObjects')
const { checkBugPermissions } = require('../middleware/userPermission')

const bugRouter = (type) => {
	const router = express.Router()

	const baseMiddleware = bugMiddleware(type)
	const accessMiddleware = bugAccessMiddleware(type)
	const creatorMiddleware = bugCreatorMiddleware(type)

	router.route("/")
		.get(
			setBugIdsasFilter,
			getDocuments(
				Bug,
				bugPopulate,
				{ type }
			),
			bugCtrl.getBugs
		)
		.post(
			bugCtrl.createBug
		)
	
	router.route("/:bugId")
		.get(
			accessMiddleware,
			setBugasResource,
			getDocumentbyId(
				Bug,
				bugPopulate,
				{ type }
			),
			bugCtrl.getBugbyId
		)
		.post(
			baseMiddleware,
			bugCtrl.assignBug
		)
		.patch(
			creatorMiddleware,
			bugCtrl.updateBug
		).delete(
			creatorMiddleware,
        	bugCtrl.deleteBug
		)
	
	router.use(
		"/:bugId/comments",
		accessMiddleware,
		commentRouter
	)
	
	router.route("/:bugId/images")
		.post(
			creatorMiddleware,
			bugCtrl.addImagestoBug
		)
		.delete(
			creatorMiddleware,
			bugCtrl.deleteImagesfromBug
		)
	
	return router
}


module.exports = bugRouter