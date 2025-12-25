const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const path = require("path");
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Serve Frontend Libraries (Handled via CDN in production)


// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Contact Route with Nodemailer
const nodemailer = require('nodemailer');

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Validate inputs
  if (!name || !email || !message) {
    return res.render("contact", { error: "Please fill all fields" });
  }

  // Send Email using Resend API (HTTP based, bypasses Render SMTP blocks)
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      const msg = "Server missing 'RESEND_API_KEY'. Please add it to Render environment variables.";
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(500).json({ error: msg });
      }
      return res.render("contact", { error: msg });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev', // Default sender for free accounts
        to: process.env.EMAIL_USER || 'your-email@example.com', // Your verified email
        reply_to: email,
        subject: `Portfolio Contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`
      })
    });

    const result = await response.json();

    if (response.ok) {
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.json({ success: "Message Sent Successfully!" });
      }
      res.render("contact", { success: "Message Sent Successfully!" });
    } else {
      throw new Error(result.message || 'Resend API Error');
    }
  } catch (error) {
    console.error("RESEND API ERROR:", error);
    let errorMessage = `Error: ${error.message}`;

    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(500).json({ error: errorMessage });
    }
    res.render("contact", { error: errorMessage });
  }
});

// Routes
// Note: Pages router handles the basic navigation
app.use("/", require("./routes/pages"));

// Server
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`View here: http://localhost:${PORT}`);
  });
}

module.exports = app;
