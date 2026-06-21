require('dotenv').config();
const express = require('express')
const router = express.Router();
const cors = require('cors');
const {productModel} = require('../models/productModel')
const mongoose = require('mongoose');

router.use(cors());
mongoose.connect(process.env.MONGO_KEY)

router.post('/', async (req, res) => {
    const email = req.body.email;
    const price = req.body.price;
    const sold = req.body.sold;
    const description = req.body.description;
    const name = req.body.name;
    const id = req.body.id;
    if(!email) return res.status(400).json({error: "incorrect format"})
    if(email && !price && !sold && !name && !description && !id){
    const userProds = await productModel.find({
        soldBy : email
    })
        return res.status(200).json({products : userProds})
    }else{
        const user = await productModel.findOne({
             _id : id
        })
        if(price) user.price = price;
        if(sold) user.sold = sold;
        if(description) user.description = description;
        if(name) user.name = name
        await user.save();
        return res.status(200).json({success: email})
    }
})

module.exports = {
    'listing' : router
}