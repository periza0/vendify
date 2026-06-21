require('dotenv').config();
const express = require('express')
const router = express.Router();
const cors = require('cors');
const {productModel} = require('../models/productModel')
const mongoose = require('mongoose');

router.use(cors());
mongoose.connect(process.env.MONGO_KEY)

router.get('/', async (req, res) => {
    try{
        const unsoldProducts = await productModel.find({sold: false})
        res.status(200).json({products: unsoldProducts})
    }catch(error){
        res.status(400).json({error: "somthing went wrong"})
    }
})

module.exports = {
   'products' : router 
}