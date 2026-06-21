const express = require('express');
const cors = require('cors');
const app = express();
const {sendOtp} = require('./routes/sendOtp')
const {verifyOtp} = require('./routes/verifyOtp');
const { As } = require('./routes/signUpAsBuyer');
const { signIn } = require('./routes/signInAsBuyer');
const { products } = require('./routes/showListings');
const {postListing} = require('./routes/postListing');
const {listing} = require('./routes/listing');
const {makeOffer} = require('./routes/makeOffer');
const {getOffers} = require('./routes/getOffers');
const {respondOffer} = require('./routes/respondOffer');
const {accept} = require('./routes/accept');
const {getSendOffers} = require('./routes/getSendOffers');
const {reject} = require('./routes/reject');
const {transactions} = require('./routes/transactions');
app.use(cors());
app.use(express.json({ limit: '4mb' }));  // Adjust the limit as per your needs
app.use(express.urlencoded({ limit: '4mb', extended: true }));

app.get('/', (req, res) => {
    res.json({status : "server is running"})
})

//! routes
app.use('/sendOtp', sendOtp);
app.use('/verifyOtp', verifyOtp);
app.use('/signUp', As)
app.use('/signIn', signIn)
app.use('/listing', products)
app.use('/postListing', postListing)
app.use('/userListings', listing)
app.use('/makeOffer', makeOffer)
app.use('/getOffers', getOffers)
app.use('/respondOffer', respondOffer)
app.use('/accept', accept)
app.use('/getSendOffers', getSendOffers)
app.use('/reject', reject)
app.use('/transactions', transactions)

app.listen(3000);