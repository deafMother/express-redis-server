const express = require("express");
const router = express.Router();
const notesController = require("../controller/noteController");
const { redisCheck } = require("../utils/cache");

router
  .route("/note")
  .all(redisCheck)
  .get(notesController.getNotes)
  .post(notesController.addNote);

module.exports = router;
