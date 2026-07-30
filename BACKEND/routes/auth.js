const express = require("express");
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const router = express.Router();

router.post(
  "/createUser",
  body("name", "Enter a valid Name.").isLength({ min: 5 }),
  body("email", "Enter avlid Email").isEmail(),
  body("password", "Password must be atleast 5 characters").isLength({
    min: 5,
  }),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exist." });
      }
      user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });
      return res.status(201).json({ user });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }
  },
);

module.exports = router;
