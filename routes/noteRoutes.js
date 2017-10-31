const express = require('express');
const router = express.Router();
const notes = require('../controller/notesController.js');

router.get("/", notes.getNotes);
router.post("/all/", notes.persistNotes);
router.post("/", notes.createNote);
router.put("/", notes.updateNote);

module.exports = router;
