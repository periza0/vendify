const mongoose = require("mongoose")
const schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const otpSchema = new schema({
    userId : {type : ObjectId, required: true},
    otp: {type: Number, required : true},
    createdAt: {type: Date, require: true},
    expiresAt: {type: Date, require: true}
})

const otpModel = mongoose.model("otp", otpSchema);

module.exports = {
    otpModel : otpModel
}