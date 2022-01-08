const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = Number(process.env.SALT_ROUNDS)

const UserSchema = mongoose.Schema({
    name : {
        type : String,
        required : "Name is required."
    },
    email : {
        type : String,
        required : "Email is required",
        trim: true,
        unique: 'Email already exists',
        match: [/.+@.+\..+/, 'Email is invalid']
    },
    hashed_password : { 
        type : String,
        required: "Password is required",
    },
    active: {
        type : Boolean,
        default : false
    },
	role: {
		type: 'String',
		enum: {
			values: ['Vanilla','Developer','Admin'],
			message: '{VALUE} Role is not supported.'
		},
		default: 'Vanilla'
	},
    image : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Image'
    },
	skills: [
        {
            type : String,
            trim: true
        }
    ],
    phone:{
        type: String,
        trim: true,
        match: [/^[0-9]{10}$/,"Contact Number is invalid."],
        default : ""
    },
    githubUserName:{
        type: String,
        match: [/[-a-zA-Z0-9()@:%_+.~#?&//=]*/, 'Github Username is invalid.'],
        trim: true,
        default : ""
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }   
});

UserSchema.path('hashed_password').validate(function(){
    if(this._password && this._password.length < 8){
        this.invalidate('password', 'Password must be at least 8 characters.')
    }
    if(!this._password && this.isNew){
        this.invalidate('password', 'Password is required.')
    }
},null)

UserSchema.virtual('password')
.set(function(pass){
    this._password = pass
    this.hashed_password = this.encryptPassword(pass)
})
.get(function(){
    return this._password
})

UserSchema.set('toJSON', {
	versionKey: false,
	transform : function (doc, ret, options) {
		delete ret.hashed_password;
		return ret;
	} 
});

UserSchema.methods = {
    authenticate : function(pass){
        return bcrypt.compareSync(pass, this.hashed_password)
    },
    encryptPassword : function(pass){
        return bcrypt.hashSync(pass, saltRounds)
    },
    isActive : function(){
        return this.active
    },
	addSkills : function(skills){
        this.skills.push(...skills)
    },
	isDeveloper : function(){
		return this.role === 'Developer'
	},
	isAdmin : function(){
		return this.role === 'Admin'
	}
}

module.exports = mongoose.model('User',UserSchema)
