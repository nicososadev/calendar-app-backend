const { Router } = require('express')
const { register, login, renewToken } = require('../controllers/auth')
const { check } = require('express-validator')

const router = Router()


router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength( {min: 6} )
    ],
    login
)


router.post(
    '/register',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength( {min: 6} )
    ],
    register
)

router.get('/renew', renewToken)


module.exports = router