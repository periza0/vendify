require('dotenv').config();
const express = require('express')
const router = express.Router();
const cors = require('cors');
const {userModel} = require('../models/userModel') 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const emailAuthenticator = require('../middlewares/emailAuthenticator');
const passwordValidation = require('../middlewares/passwordValidation');
const duplicateAuthenticator = require('../middlewares/duplicateAuthenticator');
const jwt = require('jsonwebtoken')

router.use(cors());
mongoose.connect(process.env.MONGO_KEY)
const JWT_SECRET = process.env.JWT_SECRET;
const saltingRounds = 10;

router.post('/',emailAuthenticator, passwordValidation, duplicateAuthenticator, async(req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    if(!password) res.status(400).json({error: "provide password"})
    const hashedPassword = await bcrypt.hash(password, saltingRounds);
    const user = new userModel({
        userName : email,
        passWord : hashedPassword,
        verification : false
    })
    await user.save();
    return res.status(200).json({
        email : email,
        verification : user.verification,
        id: user._id
    })
})

module.exports = {
    'As' : router
}