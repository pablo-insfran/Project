//Configuracion Express
const express = require('express')
const app = express()
const PORT = 8000
//Configuracion CORS
const cors = require('cors')
//CookieParse
const cookieParser = require('cookie-parser')

//Dotenv
require('dotenv').config()

//Socket io
const socket = require('socket.io')
const Students = require('./models/students.models')

//Middleware Express
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

//Middleware CookieParse
app.use(cookieParser())

//Configuracion Base de Datos
require('./config/mongoose.config');

//Enrutamiento Students
const StudentsRoutes = require('./routes/students.routes');
StudentsRoutes(app);

//Enrutamiento User
const UserRoutes = require('./routes/users.routes');
UserRoutes(app);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})