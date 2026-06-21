require('dotenv').config();
const express = require('express')
const router = express.Router();
const cors = require('cors');
const mongoose = require('mongoose');
const emailAuthenticator = require('../middlewares/emailAuthenticator');
const passwordValidation = require('../middlewares/passwordValidation');
const userAuthenticator = require('../middlewares/userAuthenticator')
const jwt = require('jsonwebtoken')

router.use(cors());
mongoose.connect(process.env.MONGO_KEY)
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/',emailAuthenticator, passwordValidation, userAuthenticator ,async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    if(!password) res.status(400).json({error : "provide password"})
    else{
        const token = jwt.sign({email : email}, JWT_SECRET, {expiresIn: '2h'})
        res.status(200).json({token : token})
    }
    
})

module.exports = {
    'signIn': router
}