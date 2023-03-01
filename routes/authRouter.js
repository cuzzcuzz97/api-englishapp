const { Router } = require('express')
const { getUsers, register, login,protected, logout, getUser } = require('../controllers/auth')
const { userAuth } = require('../middlewares/auth-middleware')
const { validationMiddleware } = require('../middlewares/validations-middleware')
const { registerValidation, loginValidation } = require('../validators/auth')
const router = Router()

router.get('/get-users', getUsers)
router.get('/get-user', getUser)
router.get('/protected', protected, userAuth)
router.post('/register', registerValidation, validationMiddleware, register)
router.post('/login',loginValidation, validationMiddleware, login)
router.get('/logout', logout)

module.exports = router