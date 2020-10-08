const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

// Creando servidor express
const app = express()

// Directorio público
app.use( express.static('public') )

// Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true
    })
})

// Levantando servidor
app.listen( process.env.PORT, () => {
    console.log(`Servidor levantado en el puerto ${process.env.PORT}`)
})