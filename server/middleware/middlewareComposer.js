const compose = require("compose-middleware").compose;

const { checkLeadPermissions, checkMemberPermissions, checkCreatorPermissions, checkCommentPermissions, checkQuestionPermissions, checkAnswerPermissions, checkPrivateBugPermissions, checkPublicBugPermissions } = require('./userPermission')
const { getProject, getBug, getComment, getQuestion, getAnswer } = require('../middleware/resourceHelpers')
const { setProjectId, setBugId, setCommentId, setQuestionId, setAnswerId } = require('../middleware/paramHelpers')

module.exports = {

	projectLeadMiddleware : compose([
		setProjectId,
		getProject,
		checkLeadPermissions
	]),

	projectMemberMiddleware : compose([
		setProjectId,
		getProject,
		checkMemberPermissions
	]),

	bugAccessMiddleware: (type) => {
		let result = [setBugId]

		if(type === "Private"){
			result.push(checkPrivateBugPermissions)
		}
		
		return compose(result);
	},

	bugMiddleware: (type) => {
		let result = [setBugId]

		if(type === "Private"){
			result.push(checkPrivateBugPermissions)
		}

		result.push(getBug)

		if(type === "Public"){
			result.push(checkPublicBugPermissions)
		}

		return compose(result);	
	},

	bugCreatorMiddleware :  (type) => {
		let result = [setBugId]

		if(type === "Private"){
			result.push(checkPrivateBugPermissions)
		}

		result.push(getBug)

		if(type === "Public"){
			result.push(checkPublicBugPermissions)
		}

		result.push(checkCreatorPermissions)

		return compose(result);	
	},

	commentMiddleware : compose([
		setCommentId,
		getComment
	]),

	commentAuthorMiddleware : compose([
		setCommentId,
		getComment,
		checkCommentPermissions
	]),

	questionMiddleware: compose([
		setQuestionId,
		getQuestion
	]),

	questionAuthorMiddleware: compose([
		setQuestionId,
		getQuestion,
		checkQuestionPermissions
	]),

	answerMiddleware: compose([
		setAnswerId,
		getAnswer
	]),

	answerAuthorMiddleware: compose([
		setAnswerId,
		getAnswer,
		checkAnswerPermissions
	])
}