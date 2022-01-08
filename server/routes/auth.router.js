const express =require('express');
const authCtrl = require('../controllers/auth.controller')
const passport= require('../config/passport_config')

const router = express.Router();

router.post('/registration',
    authCtrl.registerUser
)

router.get('/google',
    authCtrl.googleSigninUrl
) 

router.get('/googleCallback',
    authCtrl.googleSigninVerify
)

router.post('/login',
    authCtrl.loginUser
)    

router.get('/activation',
    authCtrl.activateUser
) 

router.route('/user')
    .get(
        passport.authenticate('user', {session : false}),
        authCtrl.getUser
    )
    .patch(
        passport.authenticate('user', {session : false}),
        authCtrl.updateUser
    )

router.route('/user/password')
    .post(authCtrl.forgotPassword)
    .patch(authCtrl.changePassword)

module.exports = router;