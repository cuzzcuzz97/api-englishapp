const express = require('express');
const router = express.Router();
const pool = require('../db');
const { validationMiddleware } = require('../middlewares/validations-middleware')
const { sign, verify } = require('jsonwebtoken')
// const token = await sign(payload,SECRETKEY);


router.post("/", async (req,res) => {
  try {
    const { title, user_id } = req.body;
    const newList = await pool.query(
      "INSERT INTO listvocab (title, user_id) VALUES($1,$2) RETURNING *",
      [title,user_id]
    );
    res.json(newList);
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
});
// delete list
router.delete("/delete/:id", async (req,res) => {
  try {
    const { id } = req.params;
    const listDelete = await pool.query(
    "delete from listvocab where id = $1;",
      [id]
    );
    res.json(listDelete);
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
});

router.get('/', async(req,res) => {
  try {
    const listvocab = await pool.query("SELECT * FROM listvocab");
    res.json(listvocab.rows);
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
});

// get vocab with user info
router.get('/:user_id',validationMiddleware, async(req,res) => {
  try {
    const {user_id} = req.params
    console.log(req.cookies.token)
    const listvocab = await pool.query("SELECT * FROM listvocab where user_id = $1",[user_id]);
    res.json(listvocab.rows);
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
});

module.exports = router;
