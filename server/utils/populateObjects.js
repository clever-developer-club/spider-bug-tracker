const { userPopulate,authorPopulate,likePopulate, repliesPopulate, imagePopulate } = require("./populateHelpers")

const commentPopulate = [
	userPopulate('Author'),
	likePopulate,
	repliesPopulate()
]

const answerPopulate = [
	userPopulate('Author'),
	likePopulate
]

const questionPopulate = [
	userPopulate('Author'),
	{
		path : 'answers',
		select: 'author text likes createdAt',
		populate: answerPopulate
	},
	likePopulate
]

const bugPopulate = [
	imagePopulate(multiple = true),
	userPopulate('Assignee'),
	userPopulate('Creator'),
	repliesPopulate('Comments')
]

const projectPopulate = [
	userPopulate('Leads'),
	userPopulate('Members'),
	{
		path: 'bugs',
		select: '-comments',
		populate: bugPopulate
	}
]

module.exports = {

	commentPopulate,
	answerPopulate,
    questionPopulate,
	bugPopulate,
	projectPopulate

}