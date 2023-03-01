const express = require('express');
const router = express.Router();
const fs = require('fs');

const fileContents = fs.readFileSync(__dirname + '/words.txt', 'utf8');
const vocabulary = fileContents.split('\n').map((word, index) => ({
    id: index + 1,
    name: word.trim()
  }));

router.get("/", async (req,res) => {
  try {
    res.json(vocabulary)
  } catch (err) {
    console.log(err)
  }
})


module.exports = router;
