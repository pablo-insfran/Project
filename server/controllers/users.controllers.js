const User = require("../models/users.models")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.PASSWORD_KEY

module.exports = {

    registerUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body)
            const userToken = jwt.sign({ _id: newUser._id }, SECRET)
            res.status(201).cookie('userToken', userToken, { httpOnly: true })
                .json({ successMessage: "Registered User", user: newUser })
        } catch (error) {
            res.status(401).json({ message: "Algo salió mal => Registrar Usuario <=", error: error })
        }
    },

    loginUser: async (req, res) => {
        const user = await User.findOne({ email: req.body.email })
        console.log(" El usuario que intenta ingresar es:", user)
        if (!user) {
            res.status(400).json({ error: "Email/Password incorrecto" })
        }
        try {
            const passwordValida = await bcrypt.compare(req.body.password, user.password)
            console.log(passwordValida, " PASSWORD VALIDA")
            if (!passwordValida) {
                res.status(400).json({ error: "Email/Password incorrecto" })
            } else {
                const userToken = jwt.sign({ _id: user._id }, SECRET)
                console.log(" El usuario que ingreso es:", user)
                res.status(201).cookie('userToken', userToken, {httpOnly:true}).json({successMessage:"Usuario Logueado"})
            }
        } catch (error) {
            res.status(400).json({ error: "Email/Password incorrecto" })
        }
    },

    logoutUser: (req, res) => {
        res.clearCookie('userToken')
        res.json({ success: 'Usuario salio' })
    }
}