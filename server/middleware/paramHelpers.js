module.exports = {

	setProjectasResource: (req,res,next) => {
		res.locals.resourceId = req.params.projectId
		next()
	},

	setBugasResource: (req,res,next) => {
		res.locals.resourceId = req.params.bugId
		next()
	},

	setBugIdsasFilter: (req,res,next) => {
		res.locals.filterIds = res.locals.project? res.locals.project.bugs : null
		next()
	},

	setCommentasResource: (req,res,next) => {
		res.locals.resourceId = req.params.commentId
		next()
	},

	setQuestionasResource: (req,res,next) => {
		res.locals.resourceId = req.params.questionId
		next()
	},

	setProjectId: (req,res,next) => {
		res.locals.projectId = req.params.projectId;
		next();
	},

	setBugId: (req,res,next) => {
		res.locals.bugId = req.params.bugId;
		next();
	},

	setCommentId: (req,res,next) => {
		res.locals.commentId = req.params.commentId;
		next();
	},

	setQuestionId: (req,res,next) => {
		res.locals.questionId = req.params.questionId;
		next();
	},

	setAnswerId: (req,res,next) => {
		res.locals.answerId = req.params.answerId;
		next();
	}

}