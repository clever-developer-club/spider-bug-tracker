const mongoose = require('mongoose')
const Bug = require('./Bug')

const ProjectSchema = mongoose.Schema({
    name : {
        type : String,
		validate: {
			validator: function(value){
				return (value && value.length > 0)
			},
			message: "Project Name cant be empty." 
		},
        required : 'Project Name is required.'
    },
	client: {
        type : String,
		validate: {
			validator: function(value){
				return (value && value.length > 0)
			},
			message: "Client Name cant be empty." 
		},
        required : 'Client Name is required.'
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
			message: "Project deadline must be valid." 
		},
        required : 'Project deadline is required.'
	},
	duration : {
        type : Number,
		min: [1,"Project duration cannot be negative or 0."],
        required : 'Project duration is required.'
    },
	tech : [
		{
			type: String,
			trim: true
		}
	],
	leads: {
		type : [
			{
            	type: mongoose.Schema.Types.ObjectId, 
            	ref: 'User'
        	}
		],
		validate: {
			validator: function(value){
				return (Array.isArray(value) && value.length > 0);
			},
			message: "There must atleast be one lead in the project."
		}
	},
	members : {
		type : [
			{
            	type: mongoose.Schema.Types.ObjectId, 
            	ref: 'User'
        	}
		],
		validate: {
			validator: function(value){
				return (Array.isArray(value) && value.length > 0);
			},
			message: "There must atleast be one member in the project."
		}
	},
	bugs : [
		{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Bug'
        }
	],
	status: {
		type: String,
		enum: {
			values: ['Ongoing','Completed','On Hold'],
			message: '{VALUE} is not supported.'
		},
		default: 'Ongoing'
	},
    createdAt : {
        type : Date,
        default : Date.now()
    },
    updatedAt : {
        type : Date,
        default : Date.now()
    }
});

ProjectSchema.pre('deleteOne', { document: true, query: false }, async function(next){
	await this.deleteBugs()
    next()
})

ProjectSchema.methods = {
	hasTech : function(technology){
        return this.tech.includes(technology)
	},
    addTech : function(technology){
		if(!this.hasTech(technology)){
			this.tech.push(technology)
		}
	},
	hasBug: function(bugId){
		return this.bugs.includes(bugId)
	},
	addBug : function(bugId){
		this.bugs.push(bugId)
	},
	deleteBug : function(bugId){
		this.bugs = this.bugs.filter((bug) => bug != bugId)
	},
	hasMember: function(memberId){
		return this.members.includes(memberId)
	},
	addMember: function(memberId){
		if(!this.hasMember(memberId)){
			this.members.push(memberId)
		}
	},
	addMembers: function(members){
		members.forEach(e => this.addMember(e))
	},
	removeMember: function(memberId){
		this.members = this.members.filter(e => e != memberId)
		if(this.hasLead(memberId)){
			this.removeLead(memberId)
		}
	},
	removeMembers: function(members){
		members.forEach(e => this.removeMember(e))
	},
	hasLead : function(leadId){
        return this.leads.includes(leadId)
	},
    addLead : function(leadId){
		console.log(this.hasMember(leadId))
		if(!this.hasLead(leadId) && this.hasMember(leadId)){
			this.leads.push(leadId)
		}
	},
	addLeads: function(leads){
		leads.forEach(e => this.addLead(e))
	},
	removeLead: function(leadId){
		this.leads = this.leads.filter(e => e != leadId)
	},
	removeLeads: function(leads){
		leads.forEach(e => this.removeLead(e))
	},
	getBugCount: function(){
		return this.bugs.length
	},
	deleteBugs: async function(){
		for(let id of this.bugs){
			let bug = await Bug.findById(id)
			if(bug){
				await bug.deleteOne()
			}
		}
	}
}

module.exports = mongoose.model("Project",ProjectSchema)