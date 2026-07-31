const express = require("express");
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt= require("bcryptjs");
const router = express.Router();
const jwt = require('jsonwebtoken');


const JWT_SECRET='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

router.post(
  "/createUser",
  body("name", "Enter a valid Name.").isLength({ min: 5 }),
  body("email", "Enter avlid Email").isEmail(),
  body("password", "Password must be atleast 5 characters").isLength({
    min: 5,
  }),
  async (req, res) => {
    // If there is an error Return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // if email exist it will throw an error
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exist." });
      }
      const salt =await bcrypt.genSaltSync(10);
      const secPass =await bcrypt.hash(req.body.password,salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data={
        user:{
          id: user.id
        }
      }
      const authToken=jwt.sign( data, JWT_SECRET )
      return res.status(201).json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }
  },
);

module.exports = router;
