const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const path = require("path");
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Serve Frontend Libraries
app.use("/scripts/three", express.static(path.join(__dirname, "node_modules/three/build")));
app.use("/scripts/gsap", express.static(path.join(__dirname, "node_modules/gsap")));



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
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    // Send Email
    try {
      await transporter.sendMail(mailOptions);
      res.render("contact", { success: "Message Sent Successfully!" });
    } catch (error) {
      console.error("Email Error:", error);
      // Simplify error message for user
      const start = error.message.indexOf("response:");
      const cleanError = start !== -1 ? error.message.substring(start) : "Authentication failed. Check your email and password.";
      res.render("contact", { error: "Error sending email: " + cleanError });
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
