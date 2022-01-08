const mongoose = require('mongoose')
const Comment = require('./Comment')
const { deleteImages } = require('../utils/multipleImageOperations')

const BugSchema = mongoose.Schema({
    images : [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Image'
        }
    ],
    title : {
        type : String,
		validate: {
			validator: function(value){
				return (value && value.length > 0)
			},
			message: "Bug Title cant be empty." 
		},
        required : 'Bug Title is required.'
    },
	issueId : {
		type : Number,
		min: [0,"Bug IssueID cant be negative."]
	},
    description : {
        type : String,
        trim : true,
        default : ""
    },
    deadline:{
		type : Date,
		validate: {
			validator: function(value){
				return value.getTime() > Date.now()
			},
			message: "Bug deadline must be valid." 
		},
        required : 'Bug deadline is required.'
	},
	severity: {
		type: String,
		enum: {
			values: ['Low','Minor','Major','Critical'],
			message: '{VALUE} Severity is not supported.'
		},
		default: 'Low'
	},
	priority: {
		type: String,
		enum: {
			values: ['Low','Medium','High'],
			message: '{VALUE} Priority is not supported.'
		},
		default: 'Low'
	},
	status: {
		type: String,
		enum: {
			values: ['Open','Closed','Under Review','Assigned'],
			message: '{VALUE} is not supported.'
		},
		default: 'Open'
	},
	type: {
		type: String,
		enum: {
			values: ['Public','Private'],
			message: '{VALUE} is not supported.'
		},
		default: 'Public'
	},
	assignedAt : {
        type : Date
    },
	assignedTo:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
	},
	createdAt : {
        type : Date,
        default : Date.now()
    },
	createdBy : {
		type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
	},
    updatedAt : {
        type : Date,
        default : Date.now()
    },
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId, 
        	ref: 'Comment'
		}
	]
});

BugSchema.set('toJSON', { 
	versionKey: false
});

BugSchema.statics = {
	getPublicBugCount: async function(){
		let count = await this.countDocuments({ type: 'Public'})
		return Number(count)
	}
}

BugSchema.pre('deleteOne', { document: true, query: false }, async function(next){
	await this.deleteComments()
	await deleteImages(this.images)
    next()
})

BugSchema.methods = {
	setId : function(id){
		this.issueId = id
	},
	isCreator: function(id){
		return this.createdBy.toString() == id.toString();
	},
	assign : function(userId){
		this.assignedTo = userId
		this.assignedAt = Date.now()
	},
	addReply: function(commentId){
		this.comments.push(commentId)
	},
	removeReply : function(commentId){
        this.comments = this.comments.filter(e => e.toString() != commentId.toString())
    },
	addImage : function(image){
        this.images.push(image)
    },
    addImages : function(images){
        if(this.images.length == 0){
            this.images = images
        }else{
            this.images = [...this.images,...images]
        }
    },
    deleteImage : function(id){
        this.images = this.images.filter((image) => image != id)
    },
	updateTime : function(){
		this.updatedAt = Date.now()
	},
	setPublic: function(){
		this.type = 'Public'
	},
	setPrivate: function(){
		this.type = 'Private'
	},
	isPublic: function(){
		return this.type === 'Public'
	},
	setIssueId: function(val){
		this.issueId = val
	},
	deleteComments: async function(){
		for(let id of this.comments){
			let comment = await Comment.findById(id)
			if(comment){
				await comment.deleteOne()
			}
		}
	}
}

module.exports = mongoose.model("Bug",BugSchema)