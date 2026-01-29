const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Contact = mongoose.model("contact", ContactSchema);

router.post("/", async (req, res) => {
  try {
    await new Contact(req.body).save();
    res.json({ message: "Message sent successfully" });
  } catch {
    res.status(500).json({ message: "Failed" });
  }
});

module.exports = router;
