const { response, request } = require('express')
const { validationResult } = require('express-validator')

const register = (req, res = response) => {

    const { name, email, password } = req.body

    // Manejo de errores
    const errors = validationResult(req)

    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    res.status(201).json({
        ok: true,
        msg: 'Register',
        name,
        email,
        password
        
    })
}

const login = (req, res = response) => {

    const { email, password } = req.body

    // Manejo de errores
    const errors = validationResult(req)

    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    res.json({
        ok: true,
        msg: 'Login',
        email,
        password
        
    })
}

const renewToken = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Renew'
        
    })
}


module.exports = {
    register,
    login,
    renewToken
}