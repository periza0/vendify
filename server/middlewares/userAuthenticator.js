const {userModel} = require("../models/userModel")
const bcrypt = require('bcrypt')

async function userAuthenticator(req, res, next){
    const email = req.body.email
    const password = req.body.password
    const user = await userModel.findOne({
        userName: email
    })
    if(!user) return res.status(400).json({error : "user does not exist"})
    const isValid = await bcrypt.compare(password, user.passWord)
    if(user && user.verification == true && isValid) next();
    else{
        if(!user) res.status(400).json({error: "user does not exist"})
        else if(!user.verification) res.status(400).json({error: "user not verified"})
        else res.status(400).json({error: "incorrect password"})
        }
}  

module.exports = userAuthenticator