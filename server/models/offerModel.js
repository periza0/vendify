const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const offerSchema = new schema({
    offeredBy: {type: String, required: true},
    offeredTo: {type: String, required: true},
    price: {type: Number, required: true},
    objectId: {type: ObjectId, required: true},
    marked: {type: Boolean, default: false},
    accepted: {type: Boolean, default: false},
    image: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    originalPrice: {type: Number},
    status:{type: String, default: "PENDING"},
    originalSeller: {type: String, required: true},
    buyer: {type: String, default: "none"}
})

const offerModel = mongoose.model('offerModel', offerSchema)

module.exports = {
    offerModel: offerModel
}