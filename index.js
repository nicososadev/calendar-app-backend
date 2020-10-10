const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const { dbConnection } = require('./database/config')

dotenv.config()

// Creando servidor express
const app = express()

// Database
dbConnection()

// Cors
app.use(cors())

// Directorio público
app.use( express.static('public') )

// Lectura y parseo del body
app.use( express.json() )

// Rutas
app.use( '/api/auth/', require('./routes/auth') )

// Levantando servidor
app.listen( process.env.PORT, () => {
    console.log(`Servidor levantado en el puerto ${process.env.PORT}`)
})