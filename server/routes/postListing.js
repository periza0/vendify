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
    const description = req.body.description;
    const name = req.body.name;
    const image = req.body.image;
    if(email && price && description && name && image){
        const newEnter =  new productModel({
                soldBy: email,
                sellerEmail: email,
                sold: false,
                price: price,
                description: description,
                image: image,
                name: name
        })
        await newEnter.save()
        res.status(200).json({success: "Listing created"})
    }else{
        res.status(400).json({error : "incorrect format"})
    }
})

module.exports = {
    'postListing' : router
}