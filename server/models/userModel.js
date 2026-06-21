const mongoose = require("mongoose")
const schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new schema({    
    userName: {type: String, required: true},
    passWord: {type: String, required: true},
    verification : {type: Boolean, default: false},
    listings: [
        {
            type: ObjectId
        }
    ]
})

const userModel = mongoose.model("user", userSchema);

module.exports = {
    userModel : userModel
}