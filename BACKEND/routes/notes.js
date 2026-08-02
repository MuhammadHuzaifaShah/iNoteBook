const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
// fetch all Notes using GET /api/notes/fetchnotes login required
router.get("/fetchnotes", fetchuser, async (req, res) => {
    try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
});

// add a new Note using POST /api/notes/addnote login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
    console.log(req.body);
    console.log(req.body.tags);
    const {title,description,tags}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Notes({
        title,description,tags,user:req.user.id
    })

    const savedNote=await note.save();
    res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
  },
);

module.exports = router;
