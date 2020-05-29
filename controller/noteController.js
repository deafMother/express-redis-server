const fs = require("fs");
const path = require("path");
const { client } = require("../utils/cache");
let note;

fs.readFile(path.resolve(__dirname, "../notes.json"), "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  }
  note = JSON.parse(data);
});

exports.getNotes = (req, res, next) => {
  // if we reach here that means that the value is not present in redis cache so we need to add it to redis cache
  console.log("from database");
  client.hset(req.path, "GET", JSON.stringify(note));
  res.json(note);
};

async function saveNote(note, res) {
  fs.writeFile(path.resolve(__dirname, "../notes.json"), note, (err) => {
    res.json({ success: "data written" });
  });
}

exports.addNote = (req, res, next) => {
  console.log(req.path); // this will give the path
  note.push(req.query);
  saveNote(JSON.stringify(note), res);
};
