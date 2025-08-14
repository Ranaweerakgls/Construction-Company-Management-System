const express = require("express");
const router = express.Router();
const twilio = require("twilio");
require("dotenv").config();

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_WHATSAPP_NUMBER,
  TWILIO_TEMPLATE_SID,
} = process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

router.post("/send-whatsapp-message", async (req, res) => {
  const { phoneNumber, templateData } = req.body;

  console.log(`Received phone number: ${phoneNumber}`);
  console.log(`Received template data:`, templateData);

  try {
    if (!phoneNumber || !templateData) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing phone number or template data" 
      });
    }

    // Create contentVariables as a JSON string
    const contentVariables = JSON.stringify({
      pid: templateData.pid.toString(),
      expenses: templateData.expenses.toString(),
      budget: templateData.budget.toString()
    });

    console.log("Content Variables:", contentVariables);
    console.log("Using Template SID:", TWILIO_TEMPLATE_SID);

    // Send the message using Twilio API
    const response = await client.messages.create({
      from: TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:${phoneNumber}`,
      contentSid: TWILIO_TEMPLATE_SID,
      contentVariables: contentVariables,
    });

    console.log("WhatsApp message sent successfully:", response.sid);
    res.status(200).json({ 
      success: true, 
      message: "WhatsApp message sent successfully",
      sid: response.sid
    });
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send WhatsApp message",
      error: error.message
    });
  }
});

module.exports = router;