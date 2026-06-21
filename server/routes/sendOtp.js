require('dotenv').config();
const nodemailer = require('nodemailer')
const express = require('express');
const cors = require('cors')
const router = express.Router();
const mongoose = require('mongoose');
const emailAuthenticator = require('../middlewares/emailAuthenticator');
const {otpModel} = require('../models/otpModel')

router.use(cors());
mongoose.connect(process.env.MONGO_KEY)

router.post('/', emailAuthenticator, (req, res) => {
    const email = req.body.email;
    const userId = req.body.userId;
    if(!userId) return res.status(400).json({error: "id not given"})
    var otp = Math.floor(Math.random()*10000);
    otp = otp < 1000 ? otp + 1000 : otp;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Verify OTP',
        html: `<p> OTP: <b>${otp}</b> <br> This OTP is valid for 60 minutes</p>`
      };
      
      transporter.sendMail(mailOptions, async function(error, info){
        if (error) {
        //   console.log(error);
            res.status(400).json({error : "error in sending mail"});
        } else {
            const newEntry = new otpModel({
                    userId: userId,
                    otp: otp,
                    createdAt: Date.now(),
                    expiresAt: Date.now() + 3600*1000
            })
            await newEntry.save();
            res.status(200).json({success : "Email sent"});
        }
      });
    
})

module.exports = {
    'sendOtp' : router
}