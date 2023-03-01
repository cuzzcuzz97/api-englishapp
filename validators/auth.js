const { check } = require('express-validator')
const db = require('../db')
const { compare } = require('bcryptjs')


// username
const username = check('username').isLength({min:8}).withMessage('username must have at least 8 characters! ')

// password
const password = check('password').isLength({min:8}).withMessage('Password must have at least 8 characters! ')

//email 
const email = check('email').isEmail().withMessage('Email not valid!')

//check if email exists
const emailExists = check('email').custom( async (email) => {
    const { rows } = await db.query('select * from users where email = $1',
    [email]
    )
    if (rows.length) {
        throw new Error('Username already exists!')
    }
})
//check if email exists
const usernameExists = check('username').custom( async (username) => {
    const { rows } = await db.query('select * from users where username = $1',
    [username]
    )
    if (rows.length) {
        throw new Error('Username already exists!')
    }
})

//login validation 
const loginValidation = check('username').custom( async (value,{req}) => {
    const user = await db.query(
    'select * from users where username = $1',
    [value])
    if (!user.rows.length) {
        throw new Error('Username not exists!')
    }
    const validPassword = await compare(req.body.password,user.rows[0].password)

    if (!validPassword) {
        throw new Error('Wrong password!')
    }

    req.user = user.rows[0]
})

module.exports = {
    registerValidation: [username,email,password,emailExists,usernameExists],
    loginValidation: [loginValidation]
}