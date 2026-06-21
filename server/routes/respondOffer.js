require("dotenv").config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const { productModel } = require("../models/productModel");
const { offerModel } = require("../models/offerModel");
const mongoose = require("mongoose");
const { userModel } = require("../models/userModel");

router.use(cors());
mongoose.connect(process.env.MONGO_KEY);

router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const sellerEmail = req.body.sellerEmail;
    const price = req.body.price;
    const productId = req.body.id;
    if(email === sellerEmail) return res.status(400).json({error: "Cannot send offer to yourself"})
    if (!email || !price || !productId || !sellerEmail)
      return res.status(400).json({ error: "incorrect format" });
    const user = await userModel.findOne({
      userName: email,
    });
    if (!user) return res.status(400).json({ error: "not logged in" });
    const productOffer = await offerModel.findOne({
      offeredBy: email,
      objectId: productId,
      marked: false
    });
    if (productOffer)
      return res.status(400).json({ error: "You have already made an offer, wait until the owner responds" });
    else {
      const product = await productModel.findOne({
        _id: productId,
      });
      if(!product) return res.status(400).json({error: "incorrect product Id"})
        const offer = await offerModel.findOne({
            offeredTo : email,
            offeredBy : sellerEmail,
            objectId: productId,
            originalPrice: product.price
        })
        offer.offeredBy = email;
        offer.offeredTo = sellerEmail
        offer.price = price
        await offer.save();
      return res.status(200).json({ success: "offer created" });
    }
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

module.exports = {
  respondOffer: router,
};
