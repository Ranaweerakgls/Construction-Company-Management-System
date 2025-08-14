
const express = require("express");
const router = express.Router();
const twilio = require("twilio");

const accountSid = "AC94109f98f75e7dce489ae3b624804006";//SID
const authToken = "0ab10432c90b80cffc231a61d9b4c7aa"; //auth token
const client = twilio(accountSid, authToken);

router.post("/send-sms", async (req, res) => {
  const { to, message } = req.body;

  try {
    const sms = await client.messages.create({
      body: message,
      from: "+17472812963", // Your Twilio number
      to:to, // The user's phone number
    });

    res.status(200).json({ success: true, sid: sms.sid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
