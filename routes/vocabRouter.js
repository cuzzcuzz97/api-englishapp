const express = require('express');
const router = express.Router();
const pool = require('../db');


router.post("/addvocab", async (req,res) => {
  try {
    const { name , meaning, list_id } = req.body;
    const newVocab = await pool.query(
      "INSERT INTO vocab (name,meaning,list_id) VALUES($1,$2,$3) RETURNING *",
      [name,meaning,list_id]
    );
    res.json(newVocab.rows[0])
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// delete vocab
router.delete("/vocab/delete/:id", async (req,res) => {
  try {
    const { id } = req.params;
    const vocabDelete = await pool.query(
    "delete from vocab where id = $1;",
      [id]
    );
    res.json(vocabDelete);
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
});

router.get('/vocab/:list_id', async(req,res) => {
  try {
    const { list_id } = req.params;
    const vocab = await pool.query("SELECT * FROM vocab WHERE list_id = $1 ORDER BY created_at DESC", [list_id]);
    res.json(vocab.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
