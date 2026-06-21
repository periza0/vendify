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
    if (!email) return res.status(400).json({ error: "Email is required" });

    const user = await userModel.findOne({
      userName: email,
    });

    if (!user) return res.status(400).json({ error: "not logged in" });
    const offers = await offerModel.find({
      offeredBy: email
    });
    return res.status(200).json({ offers: offers });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  getSendOffers: router
};
