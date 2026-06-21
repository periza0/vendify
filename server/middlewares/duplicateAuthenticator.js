const {userModel} = require("../models/userModel")

async function duplicateAuthenticator(req, res, next){
    const email = req.body.email
    const user = await userModel.findOne({
        userName: email
    })
    if(!user) next();
    else if(user.verification === false){
        res.status(200).json({
            email : email,
            id: user._id 
        })
    }
    else{
        res.status(400).json({error: "user already exists"})
    }
}  

module.exports = duplicateAuthenticator