require('dotenv').config();
const express = require('express')
const router = express.Router();
const cors = require('cors');
const {otpModel} = require('../models/otpModel')
const {userModel} = require('../models/userModel') 
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
router.use(cors());
mongoose.connect(process.env.MONGO_KEY)
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', async (req, res)=> {
    const id = req.body.id;
    const otp = req.body.otp;
    if(!id || !otp) return res.status(400).json({error: 'incorrect format'})
    const user = await otpModel.findOne({
        userId:id,
        otp: otp
    })
    if(!user || user.expiresAt < Date.now()){
        return res.status(400).json({error: "Incorrect OTP"});
    }else{
        // ! fetch user from userModel and change verification status to true
        const user = await userModel.findOne({
            _id: id
        })
        if(!user) return res.status(400).json({error: "user not found"})
        user.verification = true;
        await user.save();
        const token = jwt.sign({email : user.userName}, JWT_SECRET, {expiresIn: '2h'})
        return res.status(200).json({success: "Welcome", token : token})
    }
})

module.exports = {
    'verifyOtp' : router
}