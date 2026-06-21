const { z } = require("zod");

const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters long")
  .max(20, "Password must be at most 20 characters long")


function passwordValidation(req, res, next){
    const password = req.body.password;
    if(!password) return res.status(400).json({error: "password required"})
    try{
        passwordSchema.parse(password)
        next();
    }catch(error){
        res.status(400).json({error : error.issues[0].message})
    }
}

module.exports = passwordValidation