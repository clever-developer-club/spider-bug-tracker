const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Image = require('../models/Image');
const { userPopulate } = require('../utils/populateHelpers');
const {sendWelcomeEmail,sendRequestPasswordEmail,sendResetPasswordEmail, sendActivationEmail} = require('../utils/sendEmail')
const getError = require('../utils/dbErrorHandler');
const { createToken } = require('../utils/createTokens');
const ActivationToken = require('../models/ActivationToken');
const PasswordToken = require('../models/PasswordToken');
const {urlGoogle,getGoogleEmailFromCode} = require('../utils/googleClient')
const {deleteImages} = require('../utils/multipleImageOperations')

const redirectURL = process.env.REDIRECT_URL
const frontendURL = process.env.FRONTEND_URL
const jwtSecret = process.env.SECRET_KEY

module.exports = {

    // @desc      Register New User
    // @route     POST /api/v1/auth/registration
    // @access    Public

    registerUser : async(req,res) => {
		try{

       	 	const user = new User({
            	email : req.body.email,
            	name : req.body.name,
            	password : req.body.password,
				role: req.body.role,
				skills: []
        	})

            await user.save()

            const {token,hash} = createToken()
			if(!user.active){

				const activateToken = new ActivationToken({
					user : user.email,
					token : hash
				})
				await activateToken.save()

				let link = `${redirectURL}/#/activation?user=${user.email}&token=${token}`
				let resp = await sendWelcomeEmail({
					user : req.body.name,
					email : req.body.email
				},link)

				if(resp){
					return res.status(201).json({
						error: false,
                		message: "Successfully signed up and verification email queued."
					})
				}else{
					await user.deleteOne()
					await activateToken.deleteOne()
					return res.status(400).json({
						error: false,
                		message: "Could not send verification mail."
					})
				}

			}else{

				await sendActivationEmail({
					user : req.body.name,
					email : req.body.email
				})

				return res.status(201).json({
					error: false,
                	message: "Successfully signed up and verified."
				})
			}

        }
        catch(err){
			let errMsg = getError(err)
            return res.status(400).json({
                error: true,
                message:  errMsg.length > 0 ? errMsg : "Could not create bug."
            })
        }
    },

    // @desc      Login User
    // @route     POST /api/v1/auth/login
    // @access    Public

    loginUser : async(req,res) => {
        try{
            let user = await User.findOne({email : req.body.email})
                
			if(user){
                if(!user.authenticate(req.body.password)){
                    res.status(400).json({
                        auth : false,
                        message : "Password does not match"
                    })
                }else if(!user.isActive()){
                    res.status(400).json({
                        auth : false,
                        message : "Account has not been activated. You need to verify your email first."
                    })
                }else{
                    const token = jwt.sign({id : user.email},jwtSecret)
                    return res.status(200).json({
                        auth : true,
                        token : token,
                        data: await User.populate(user,userPopulate),
                        expires : new Date(new Date().getTime() + 2628000000),
                        message: "Successfully logged in!"
                    })
                }
            }else{
                res.status(404).json({
                    auth : false,
                    message : "User Doesn't Exist"
                })
            }
        }
        catch(err){
            return res.status(400).json({
                auth : false,
                message : "Could not Login"
            })
        }
    },

    // @desc      Activate User
    // @route     GET /api/v1/auth/activation
    // @access    Public

    activateUser : async(req,res) => {
        try{
            if(!req.query.user || !req.query.token){
                return res.redirect(`${frontendURL}/#/signin?activation=false`)
            }
            
			let token = await ActivationToken.findOne({user : req.query.user})
        
            if(token && token.authenticate(req.query.token)){
                
				await token.deleteOne()

				let user = User.findOne({email : req.query.user})
                
                if(user){
                    user.active = true
                    await user.save()
                    return res.redirect(`${frontendURL}/#/signin?activation=true`)
				}
				
			}

			res.redirect(`${frontendURL}/#/signin?activation=false`)

        }
        catch(error){
            res.redirect(`${frontendURL}/#/signin?activation=false`)
        }
    },

    // @desc      Get User
    // @route     GET /api/v1/auth/user
    // @access    Private

    getUser : async (req,res) => {
        let user = await User.findById(req.user._id)
			.populate(userPopulate())
        if(req.user){
            return res.status(200).json({
                error: false,
                data : user
            })
        }else{
            return res.status(400).json({
                error : true,
				message : "Could not get user."
            })
        }
    },

    // @desc      Update User
    // @route     PATCH /api/v1/auth/user
    // @access    Private

    updateUser : async (req,res) => {
        try{
        if(req.user){
            
			let updateFields = {                    
                name: req.body.name,
				phone: req.body.phone,
				skills: req.body.skills,
				githubUserName: req.body.githubUserName,
            }

            for (const [key, value] of Object.entries(updateFields)) {
                if (!value) {
                  delete updateFields[key];
                }
            }

            let user = await User.findByIdAndUpdate(
                req.user._id,
                {
                    ...updateFields,
                    updatedAt : Date.now()
                },
                {
                    new : true,
                    runValidators: true
                }
            )
			
            if(req.body.image){
                if(user.image){
                    await deleteImages([user.image])
                }
                let image = new Image()
                let response = await image.upload(user._id,req.body.image,'User')
                if(response){
                    user.image = response
                    await image.save()
                }
            }

            await user.save()

            return res.status(200).json({
                error : false,
                data : await User.populate(user,userPopulate)
            })

        }else{
            return res.status(400).json({
                error : true,
                message : "Could not get user."
            })
        }
        }catch(error){
            return res.status(400).json({
                error: true,
				message: getError(error)
            })
        }
    },

    // @desc      Forgot Password
    // @route     POST /api/v1/auth/user/password
    // @access    Private

    forgotPassword : async (req,res) => {
        console.log(req.user)
        try{
            User.findOne({email : req.body.email})
            .then(async(user) => {
                if(user){
                    const {token,hash} = createToken()
                    const passwordToken = new PasswordToken({
                        user : user.email,
                        token : hash
                    })
                    await passwordToken.save()
                    let link = `${frontendURL}/#/change-password?user=${user.email}&token=${token}`
                    let resp = await sendRequestPasswordEmail({
                        user : user.name,
                        email : user.email
                    },link)
                    if(resp){
                        return res.status(200).json({
                            error: false,
                            message: `Email sent to ${user.email} for password change.`
                        })
                    }else{
                        return res.status(400).json({
                            error: false,
                            message: "Email could not be sent for password change."
                        })
                    }
                }else{
                    return res.status(404).json({
                        error: true,
                        message: "User doesnt exist."
                    })
                }
            })
        }
        catch(err){
            return res.status(400).json({
                error: true,
                message: "Could not change password."
            })
        }
    },

    // @desc      Change Password
    // @route     PATCH /api/v1/auth/user/password
    // @access    Private

    changePassword : async (req,res) => {
        try{
            if(!req.body.user){
                return res.status(400).json({
                    error: true,
					message: "User Email not specified."
                })
            }
            if(!req.body.password){
                return res.status(400).json({
                    error: true,
					message: "Password not specified."
                })
            }
            if(!req.body.token){
                return res.status(400).json({
                    error: true,
                    message: "Token not specified."
                })
            }
            PasswordToken.findOne({user : req.body.user})
            .then(async (token) => {
                if(token && token.authenticate(req.body.token)){
                    User.findOne({email : req.body.user})
                    .then(async (user) => {
                        if(user){
                            user.password = req.body.password
                            await user.save()
                            await token.deleteOne()
                            sendResetPasswordEmail({
                                user : user.name,
                                email : user.email
                            })
                            return res.status(200).json({
                                error: false,
								message: `Password successfully reset.`
                            })
                        }else{
                            return res.status(404).json({
                                error: true,
                                message: "User doesnt exist."
                            })
                        }
                    })
                }else{
                    return res.status(400).json({
                        error: true,
                        message: "Invalid Token."
                    })
                }
            })
        }
        catch(error){
            return res.status(400).json({
                error: true,
                message: "Could not reset password."
            })
        }
    },

    
    // @desc      Login with Google
    // @route     GET /api/v1/auth/google
    // @access    Public

    googleSigninUrl : async (req,res) => {
        res.redirect(urlGoogle())
    },
    
    // @desc      Callback for Google Auth
    // @route     GET /api/v1/auth/googleCallback
    // @access    Public

    googleSigninVerify : async (req,res) => {
        try{
            let email = await getGoogleEmailFromCode(req.query.code)
            User.findOne({email : email})
            .then(user => {
                if(user){
                    const token = jwt.sign({id : user.email},jwtSecret)
                    let url = `${frontendURL}/#/signin?token=${encodeURIComponent(token)}`
					res.redirect(url)
                }else{
                    let url = `${frontendURL}/#/signup?email=${encodeURIComponent(email)}`
					res.redirect(url)
                }
            })
        }
        catch(err){
            let url = `${frontendURL}/#/signin?error=${encodeURIComponent('Could not login')}`
            return  res.redirect(url)
        }
    }
}

