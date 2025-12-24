const express = require("express");
const router = express.Router();

// This route handles POST requests to /contact
// Mounted at /contact in server.js, so here we use "/"
router.post("/", (req, res) => {
    // Basic validation and logging
    const { name, email, message } = req.body;
    console.log(`Received message from ${name} (${email}): ${message}`);

    // In a real production app, we would send an email or save to DB here.
    // For now, render a success view or redirect back with a query param.
    res.render("contact", { success: "Message sent successfully!" });
});

module.exports = router;
