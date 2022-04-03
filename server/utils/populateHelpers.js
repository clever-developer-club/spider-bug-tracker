const imagePopulate = (multiple) => {

	let resultPopulate = {
		path : 'image',
		select : 'public_id url'
	}

	if(multiple){
		resultPopulate.path = 'images'
	}

	return resultPopulate
}

const userPopulate = (type) => {

	if(!type) return imagePopulate()

	let resultPopulate = {
		path: '',
		select: 'name email role createdAt image',
		populate: imagePopulate()
	}

	if(type == 'Author'){
		resultPopulate.path = "author"
	}else if(type == 'Leads'){
		resultPopulate.path = "leads"
	}else if(type == 'Members'){
		resultPopulate.path = "members"
	}else if(type == 'Creator'){
		resultPopulate.path = "createdBy"
	}else if(type == 'Assignee'){
		resultPopulate.path = "assignedTo"
	}

	return resultPopulate
}

const likePopulate = {
	path: 'likes',
	select: 'name'
}

const repliesPopulate = (type) => {
	
	let resultPopulate = {
		path: 'replies',
		select: 'author text likes replyCount',
		populate: [
			userPopulate('Author'),
			likePopulate,
		]
	}

	if(type == 'Comments'){
		resultPopulate.path = "comments"
	}

	return resultPopulate
}

module.exports = {

	userPopulate,
	imagePopulate,
	likePopulate,
	repliesPopulate

}
