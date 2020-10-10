const { Router } = require('express')
const { register, login, renewToken } = require('../controllers/auth')
const { check } = require('express-validator')
const { fieldsValidator } = require('../middlewares/fieldsValidator')
const { JWTValidator } = require('../middlewares/tokenValidator')

const router = Router()


router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength( {min: 6} ),
        fieldsValidator
    ],
    login
)


router.post(
    '/register',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength( {min: 6} ),
        fieldsValidator
    ],
    register
)

router.get('/renew', JWTValidator, renewToken)


module.exports = router