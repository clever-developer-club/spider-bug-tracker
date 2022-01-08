const express = require('express')
const User = require('../models/User')
const { userPopulate } = require('../utils/populateHelpers')
const developerCtrl = require('../controllers/developer.controller')
const { getDocuments, getDocumentbyId } = require('../middleware/modelResults')

const router = express.Router()

router.route("/")
    .get(
		getDocuments(
            User,
            userPopulate(),
			{ role : "Developer" }
        ),
        developerCtrl.getDevelopers
    )

module.exports = router