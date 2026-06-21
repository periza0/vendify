const mongoose = require('mongoose')
const schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const productModelSchema = new schema({
        soldBy: {type: String},
        sellerEmail: {type: String},
        sold: {type: Boolean},
        price: {type: Number},
        description: {type: String},
        image: {type: String},
        name: {type: String},
        buyer: {type: String, default: "none"}
    }) 

const productModel = mongoose.model("productModel", productModelSchema)

module.exports = {
    productModel : productModel
}