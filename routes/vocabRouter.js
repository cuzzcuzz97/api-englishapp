const express = require('express');
const router = express.Router();
const pool = require('../db');
const { validationMiddleware } = require('../middlewares/validations-middleware')
const { sign, verify } = require('jsonwebtoken')
const SECRETKEY = require('../constants')


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

router.get('/vocab/:list_id',validationMiddleware, async(req,res) => {
  try {
    const decoded = verify(req.cookies.token, SECRETKEY);
    const user_id = decoded.id;
    const { list_id } = req.params;
    const list_id_user = await pool.query("SELECT * FROM listvocab where id = $1", [list_id]);
    const user_authorized = list_id_user.rows[0].user_id
    if (user_authorized === user_id) {
      const vocab = await pool.query("SELECT * FROM vocab WHERE list_id = $1 ORDER BY created_at ASC", [list_id]);
      res.json(vocab.rows);
    } else {
      throw new Error('401 not authorized')
    }
  } catch (err) {
    console.error(err.message); 
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
