// Importações
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const {authenticate} = require("./services/AuthService")
const cookieParser = require("cookie-parser")

// Invocação da aplicação
const app = express()
// Definições iniciais do app
app.use(cors({credentials: true, origin: "http://localhost:3001"}))
app.use(cookieParser())
app.use(express.json({limit: "50mb"}))
app.use("/image", require("./controllers/ImageController"))
app.use(fileUpload({useTempFiles: true, tempFileDir: "./resources/temp/"}))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}))
app.use(express.static("resources/img"))

// Definição dos controllers
app.use("/login", require("./controllers/LoginController"))
app.use("/logout", require("./controllers/LogoutController"))
app.use("/reset-password", require("./controllers/ResetPasswordController"))

app.use("/auth", authenticate, require("./controllers/AuthController"))
app.use("/user", authenticate, require("./controllers/UserController"))
app.use("/advertisement", require("./controllers/AdvertisementController"))
app.use("/favorite", authenticate, require("./controllers/FavoriteController"))
app.use("/administrator", authenticate, require("./controllers/AdministratorController"))
app.use("/manufacturer", authenticate, require("./controllers/ManufacturerController"))


// Rota inexistente
app.use((req, res) => {
    res.status(404).send({error: "not found"})
})

module.exports = app