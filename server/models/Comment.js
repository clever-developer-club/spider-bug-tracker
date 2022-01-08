const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
	},
    text: {
        type : String,
        required : "Comment can't be empty."
    },
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId, 
        	ref: 'User'
		}
	],
    createdAt : {
        type : Date,
        default : Date.now()
    },
	parent_id : {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
    },
    parent_model : {
        type : String,
        required : true
    },
    replies: [
		{
			type: mongoose.Schema.Types.ObjectId, 
        	ref: 'Comment'
		}
	]
});

CommentSchema.virtual('replyCount')
.set(function(val){
	this._replyCount = val
})
.get(function(){
    return this._replyCount || 0
})

CommentSchema.set('toJSON', { 
	virtuals: true,
	versionKey: false,
	transform : function (doc, ret, options) {
		delete ret.id;
		return ret;
	} 
});

CommentSchema.pre('deleteOne', { document: true, query: false }, async function(next){
    await this.deleteReplies()
    next()
})

CommentSchema.pre('save', { document: true, query: false }, async function(next){
    this.replyCount = this.replies.length
    next()
})

CommentSchema.methods = {

	isAuthor: function(id){
		return this.author.toString() == id.toString();
	},
	hasLike : function(id){
		return this.likes.includes(id);
	},
	addLike : function(id){
		if(!this.hasLike(id)){
			this.likes.push(id);
		}
	},
	removeLike : function(id){
		this.likes = this.likes.filter(e => e.toString() !== id.toString())
	},
	addReply : function(id){
		this.replies.push(id);
	},
	removeReply : function(id){
		this.replies = this.replies.filter(e => e.toString() !== id.toString())
	},
	setText : function(text){
		if(text && text.length > 0){
			this.text = text
		}
	},
	deleteReplies: async function(){
		for(let id of this.replies){
			let reply = await this.model('Comment').findById(id)
			if(reply){
				await reply.deleteOne()
			}
		}
	}

}

module.exports = mongoose.model("Comment",CommentSchema)