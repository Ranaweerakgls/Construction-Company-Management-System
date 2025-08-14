const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe("your_secret_key_here"); // Replace with your secret key

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe uses cents
      currency: "usd",
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
