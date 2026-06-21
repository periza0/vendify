function emailAuthenticator(req, res, next){
    const email = req.body.email;
    // console.log(req.body)
    if(!email) res.status(400).json({error : "Email not provided"})
    else{
         next();
    }
}
module.exports = emailAuthenticator;