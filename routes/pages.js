const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.render("home"));
router.get("/about", (req, res) => res.render("about"));
router.get("/skills", (req, res) => res.render("skills"));
router.get("/projects", (req, res) => res.render("projects"));
router.get("/experience", (req, res) => res.render("experience"));
router.get("/resume", (req, res) => res.render("resume"));
router.get("/contact", (req, res) => res.render("contact"));

module.exports = router;
