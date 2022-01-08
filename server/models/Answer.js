const mongoose = require('mongoose');

const AnswerSchema = mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
	},
    text: {
        type : String,
		validate: {
			validator: function(value){
				return (value && value.length > 0)
			},
			message: "Answer cant be empty." 
		},
        required : "Answer text is required."
    },
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId, 
        	ref: 'User'
		}
	],
	questionId: {
		type: mongoose.Schema.Types.ObjectId, 
        ref: 'Question'
	},
    createdAt : {
        type : Date,
        default : Date.now()
    }
});

AnswerSchema.methods = {

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
		this.likes = this.likes.filter(e => e._id.toString() !== id.toString())
	},
	setText : function(text){
		if(text && text.length > 0){
			this.text = text
		}
	}
	
}

module.exports = mongoose.model("Answer",AnswerSchema)