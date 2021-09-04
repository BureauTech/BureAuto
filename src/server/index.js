// Importações
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const fileUpload = require("express-fileupload")

// Invocação da aplicação
const app = express()

// Definições iniciais do app
app.use(cors())
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}))
app.use(express.json({limit: "50mb"}))

app.use(fileUpload({useTempFiles: true, tempFileDir: "./resources/temp/"}))

// Definição dos controllers
app.use("/login", require("./controllers/LoginController"))
app.use("/advert", require("./controllers/AdvertController"))
app.use("/bookmark", require("./controllers/BookmarkController"))
app.use("/message", require("./controllers/MessageController"))
app.use("/user", require("./controllers/UserController"))
app.use("/view", require("./controllers/ViewController"))

// Rota inexistente
app.use((req, res) => {
    res.send("Requisição não encontrada.")
})

const port = process.env.PORT || 3000

app.listen(port, function() {
    console.log("Running on port", port)
})

module.exports = app
