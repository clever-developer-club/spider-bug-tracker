const mongoose = require('mongoose');
const Answer = require('./Answer')

const QuestionSchema = mongoose.Schema({
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
			message: "Question cant be empty." 
		},
        required : "Question is required."
    },
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId, 
        	ref: 'User'
		}
	],
	tags: [
		{
			type: String,
			trim: true
		}
	],
    createdAt : {
        type : Date,
        default : Date.now()
    },
    answers: [
		{
			type: mongoose.Schema.Types.ObjectId, 
        	ref: 'Answer'
		}
	],
	acceptedAnswer: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Answer'
	}
});

QuestionSchema.pre('deleteOne', { document: true, query: false }, async function(next){
    await this.deleteAnswers()
    next()
})

QuestionSchema.methods = {
	
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
	hasAnswer: function(id){
		return this.answers.includes(id);
	},
	addAnswer : function(id){
		this.answers.push(id);
	},
	removeAnswer : function(id){
		this.answers = this.answers.filter(e => e._id.toString() !== id.toString())
	},
	setText : function(text){
		if(text && text.length > 0){
			this.text = text
		}
	},
	addTags: function(tags){
		if(tags){
			this.tags = tags
		}
	},
	markAcceptedAnswer: function(acceptedAnswer){
		if(acceptedAnswer && hasAnswer(acceptedAnswer)){
			this.acceptedAnswer = acceptedAnswer
		}
	},
	deleteAnswers: async function(){
		for(let id of this.answers){
			let answer = await Answer.findById(id)
			if(answer){
				await answer.deleteOne()
			}
		}
	}

}

module.exports = mongoose.model("Question",QuestionSchema)