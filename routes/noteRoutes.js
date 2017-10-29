const express = require('express');
const router = express.Router();
const notes = require('../controller/notesController.js');

router.get("/", notes.getNotes);
router.post("/all/", notes.persistNotes);
router.post("/", notes.createNote);
router.put("/", notes.updateNote);
// router.get("/:id/", notes.getNote);


module.exports = router;

/**
 * was bauen wir
 *  Schritt 1  wir lösen den localstore ab
 *  =========
 * GET /notes/  -> liefert alle notes
 * POST /notes/all/  -> prov. um localstore abzulösen
 *
 * Schritt 2  wir machen REST
 * ==========
 * GET /notes/:id  -> liefert 1 note
 * POST /notes/  -> erzeugt eine note
 * PUT /notes/:id  -> updated eine note
 */