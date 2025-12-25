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

  try {
    // Create Transporter (Configure with your credentials in .env)
    // NOTE: For Gmail, you likely need an App Password if 2FA is on.
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn("Missing email credentials in .env. Skipping email sending.");
      return res.render("contact", { error: "Server missing 'EMAIL_USER' or 'EMAIL_PASS' in .env file." });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Mail Options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Authorised email
      replyTo: email, // User's email for replies
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    // Send Email
    try {
      await transporter.sendMail(mailOptions);
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.json({ success: "Message Sent Successfully!" });
      }
      res.render("contact", { success: "Message Sent Successfully!" });
    } catch (error) {
      console.error("FULL EMAIL ERROR OBJECT:", JSON.stringify(error, null, 2));
      console.error("EMAIL ERROR MESSAGE:", error.message);
      console.error("EMAIL ERROR CODE:", error.code);

      let errorMessage = `Error sending email: ${error.message}`;

      if (error.code === 'EAUTH') {
        errorMessage = "Authentication failed. Please DOUBLE-CHECK your EMAIL_USER and EMAIL_PASS (App Password) on Render.";
      }

      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(500).json({ error: errorMessage });
      }
      res.render("contact", { error: errorMessage });
    }
  } catch (error) {
    console.error("General Email Error:", error);
    res.render("contact", { error: "Server error: " + error.message });
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
