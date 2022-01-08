const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const ActivationTokenSchema = new mongoose.Schema({
    user : {
        type : String,
        required : "Email is required.",
        unique : "A token already exists for this email."
    },
    token : {
        type: String,
        required: true,
    },
    createdAt : {
        type: Date,
        default: Date.now(),
        expires: 3600,
    }
})

ActivationTokenSchema.methods = {
    authenticate : function(pass){
        return bcrypt.compareSync(pass, this.token)
    }
}

module.exports = mongoose.model('ActivationToken',ActivationTokenSchema)