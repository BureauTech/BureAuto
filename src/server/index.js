// Importações
require("dotenv").config()
const express    = require("express")
const cors       = require("cors")

// Invocação da aplicação
const app = express()

// Definições iniciais do APP
    app.use(cors())
    app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}))
    app.use(express.json({limit: "50mb"}))

// Definição dos controllers
    app.use("/adverts", require("./controller/AdvertsController"))
    app.use("/bookmarks", require("./controller/BookmarksController"))
    app.use("/mensagens", require("./controller/MessagesController"))
    app.use("/readUsers", require("./controller/ReadUsersController"))
    app.use("/users", require("./controller/UsersController"))
    app.use("/views", require("./controller/ViewsController"))

// Rota inexistente
    app.use((req, res) => {
        res.send("Requisição não econtrada.")
    })

const port = process.env.PORT || 3000

app.listen(port, function() {
    console.log("Running on port", port)
})

module.exports = app