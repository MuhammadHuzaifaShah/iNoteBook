const express = require("express");
const router =express.Router();

router.get('/',(req,res)=>{
    res.json({
        "name": "Thomas",
        "number": 34
    })
})

module.exports=router;