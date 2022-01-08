const nodemailer = require('nodemailer');
const { welcomeTemplate, activationTemplate, requestPasswordTemplate, resetPasswordTemplate, addBugTemplate ,assignBugTemplate } = require('./emailTemplates')

const sendEmail = async (recipient,subject,html) => {

    try {

        const transporter = await nodemailer.createTransport({
            host : 'smtp.gmail.com',
            port : 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        }) 

        const mailOptions = {
            from: `"Spider Bug Tracker" <${process.env.EMAIL_USER}>`,
            to: recipient.email,
            subject: subject,
            html: html
        };
      
        const results = await transporter.sendMail(mailOptions)
        if (results.rejected.length == 0 && results.response.startsWith("250 2.0.0 OK")) {
            return true
        }
        return false
        
    }catch(err){
        return false
    }
}

module.exports = {

	sendWelcomeEmail : async (recipient,link) => {
		let resp = await sendEmail(recipient,'Successful Registration at Spider Bug Tracker',welcomeTemplate(recipient.user,link))
		if(resp){
			return true
		}
		return false
	},
	
	sendActivationEmail : async (recipient) => {
		let resp = await sendEmail(recipient,'Successful Account Activation at Spider Bug Tracker',activationTemplate(recipient.user))
		console.log(resp);
		if(resp){
			return true
		}
		return false
	},
	
	sendRequestPasswordEmail : async (recipient,link) => {
		let resp = await sendEmail(recipient,'Request for password change at Spider Bug Tracker',requestPasswordTemplate(recipient.user,link))
		if(resp){
			return true
		}
		return false
	},
	
	sendResetPasswordEmail : async (recipient) => {
		let resp = await sendEmail(recipient,'Successful password reset at Spider Bug Tracker',resetPasswordTemplate(recipient.user))
		if(resp){
			return true
		}
		return false
	},

	sendAddBugEmail : async (recipient,project,link) => {
		let resp = await sendEmail(recipient,'Bug Created at Spider Bug Tracker',addBugTemplate(recipient.user,project,link))
		if(resp){
			return true
		}
		return false
	},

	sendAssignBugEmail : async (recipient,project,link) => {
		let resp = await sendEmail(recipient,'Bug Assigned at Spider Bug Tracker',assignBugTemplate(recipient.user,project,link))
		if(resp){
			return true
		}
		return false
	}

}
