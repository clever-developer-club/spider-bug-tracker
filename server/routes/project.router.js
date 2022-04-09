const express = require('express')
const Project = require('../models/Project')
const projectCtrl = require('../controllers/project.controller')
const bugRouter = require('./bug.router')
const { getDocuments, getDocumentbyId } = require('../middleware/modelResults')
const { setProjectasResource } = require('../middleware/paramHelpers')
const { projectMemberMiddleware, projectLeadMiddleware } = require('../middleware/middlewareComposer')
const { projectPopulate } = require('../utils/populateObjects')
const { filterProjects } = require('../middleware/userPermission')

const router = express.Router()

router.route("/")
    .get(
		getDocuments(
            Project,
			projectPopulate,
			null,
			true
        ),
        projectCtrl.getProjects
    )
    .post(
        projectCtrl.createProject
    )

router.route("/:projectId")
    .get(
		setProjectasResource,
		getDocumentbyId(
            Project,
			projectPopulate
        ),
        projectCtrl.getProjectbyId
    )
    .patch(
		projectLeadMiddleware,
        projectCtrl.updateProject
    )
    .delete(
        projectLeadMiddleware,
        projectCtrl.deleteProject
    )


router.use(
	"/:projectId/bugs",
	projectMemberMiddleware,
	bugRouter('Private')
)

router.route('/:projectId/leads')
	.post(
		projectLeadMiddleware,
		projectCtrl.addLeadstoProject
	)
	.delete(
		projectLeadMiddleware,
		projectCtrl.deleteLeadsfromProject
	)

router.route('/:projectId/members')
	.post(
		projectLeadMiddleware,
		projectCtrl.addMemberstoProject
	)
	.delete(
		projectLeadMiddleware,
		projectCtrl.deleteMembersfromProject
	)

module.exports = router 
