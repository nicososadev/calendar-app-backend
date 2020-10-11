const { response } = require('express')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/JWT')

const User = require('../models/User')


const register = async(req, res = response) => {

    const { email, password } = req.body

    try {

        let user = await User.findOne({ email })

        if( user ){

            res.status(400).json({

                ok: false,
                msg: 'User already exists'
            })
        }

        user = new User( req.body )

        // Encryptado del password
        const salt = bcrypt.genSaltSync()

        user.password = bcrypt.hashSync(password, salt)

        await user.save()

        // Json Web Token
        const token = await generateJWT( user.id, user.name )

        res.status(201).json({

            ok: true,
            uid: user.id,
            name: user.name,
            token: token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({

            ok: false,
            msg: 'Could not register new user'
        })
    }

}

const login = async(req, res = response) => {

    const { email, password } = req.body

    try {
        
        const user = await User.findOne({ email })

        if( !user ){

            res.status(400).json({

                ok: false,
                msg: 'User does not exists'
            })
        }

        // Match password
        const validPassword = bcrypt.compareSync(password, user.password)

        if( !validPassword ){

            res.status(400).json({

                ok: false,
                msg: 'Incorrect password'
            })
        }

        // Json Web Token
        const token = await generateJWT( user.id, user.name )

        res.json({

            ok: true,
            uid: user.id,
            name: user.name,
            token: token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({

            ok: false,
            msg: 'Could not login'
        })
    }

}

const renewToken = async(req, res = response) => {

    const uid = req.uid
    const name = req.name

    const newToken = await generateJWT( uid, name )

    res.json({
        ok: true,
        uid: uid,
        name: name,
        token: newToken

    })
}


module.exports = {
    register,
    login,
    renewToken
}