const express = require("express");
const User=require("../models/Users");
const { body, validationResult } = require('express-validator');
const router =express.Router();


router.post('/',body('name','Enter a valid Name.').isLength({ min: 5 }),body('email','Enter avlid Email').isEmail(),body('password','Password must be atleast 5 characters').isLength({ min: 5 }),(req,res)=>{
   const result =validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    }).then(user => res.json(user)).catch(err=>{console.log(err);
        if (err.code === 11000) {
        return res.status(400).json({
            error: "Email already exists"
        });
    }

    return res.status(500).json({
        error: "Internal Server Error"
    });
    })

},);

module.exports=router;