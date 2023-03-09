const db = require('../db');
const { hash } = require('bcryptjs')
const { sign, verify } = require('jsonwebtoken')
require('dotenv').config()
const SECRETKEY = require('../constants')

exports.getUsers = async (req,res) => {
    try {
        const response = await db.query(`select user_id, email from users`)
        
        return res.status(200).json({
            success: true,
            users: response.rows
        })
    } catch (err) {
        console.log(err.message)
    }
}

exports.getUser = async (req, res) => {
    try {
      const decoded = verify(req.cookies.token, SECRETKEY);
      const user_id = decoded.id;
  
      const response = await db.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
      
      return res.status(200).json({
        success: true,
        user: response.rows[0]
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message
      });
    }
  };


exports.register = async (req,res) => {
    const {email,username,password} = req.body;
    try {
        const hashPassword = await hash(password,10)

        await db.query(
            'insert into users(email,username,password) values($1,$2,$3)',
            [email,username,hashPassword]
            )
        return res.status(201).json({
            success: true,
            message: 'registration was successful'
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            error: err.message
        })
    }
}

exports.login = async (req,res) => {
    let user = req.user
    let payload = {
        id: user.user_id,
        email: user.email,
    }
    try {
        const token = await sign(payload,SECRETKEY);
        return res.status(200).cookie('token',token, {httpOnly: true}).json({
            success: true,
            message: 'Logged in successfully'
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.protected = async (req, res) => {
    try {
        if (!req.cookies.token) {
            return res.status(500).json({
                message: 'not authenticated'
            })
        }
      return res.status(200).json({
        info: 'protected info',
      })
    } catch (error) {
      console.log(error.message)
    }
  }

exports.logout = async (req,res) => {
    try {
        return res.status(200).clearCookie('token', {httpOnly: true}).json({
            success: true,
            message: 'Logged out successfully'
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}