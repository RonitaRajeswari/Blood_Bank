const express = require('express')
const { registerController,  loginController, currentUserController } = require('../controller/authController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

//route
//register || POST
router.post('/register',registerController)

//LOGIN || POST
router.post('/login', loginController)

//GET CURRENT USER || GET
router.get('/current-user', authMiddleware, currentUserController)


module.exports  = router