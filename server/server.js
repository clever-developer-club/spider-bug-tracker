const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config();

const passport = require('./config/passport_config')

const authRouter = require('./routes/auth.router');
const projectRouter = require('./routes/project.router')
const bugRouter = require('./routes/bug.router')
const developerRouter = require('./routes/developer.router')
const questionRouter = require('./routes/question.router')

const port = process.env.PORT || 5000
const mongo_url = process.env.MONGO_URL
const frontendURL = process.env.FRONTEND_URL

const app = express();

mongoose.connect(mongo_url,{useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json({limit : '50mb'}));
app.use(express.urlencoded({limit : '50mb', extended : false}));
app.use(cookieParser());
app.use(cors({
    origin : frontendURL
}))

app.use('/api/v1/auth',authRouter)
app.use(
	'/api/v1/projects',
	passport.authenticate('developer', {session : false}),
	projectRouter
)
app.use(
	'/api/v1/public/bugs',
	passport.authenticate('user', {session : false}),
	bugRouter('Public')
)
app.use(
	'/api/v1/developers',
	passport.authenticate('developer', {session : false}),
	developerRouter
)
app.use(
	'/api/v1/discussions',
	passport.authenticate('developer', {session : false}),
	questionRouter
)

app.listen(port, ()=>{
    console.log(`Server Running on ${port}`)
});




