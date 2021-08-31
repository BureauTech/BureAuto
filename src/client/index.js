// Importações
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")

// Invocação da aplicação
const app = express()

// Definições iniciais do APP
app.use(cors())
// app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
// app.use(express.json({ limit: "50mb" }))

//Definição do motor EJS e views
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

// Definição dos routes
app.use("/hello_world", require("./src/routes/hello_worldRoutes"))

// Rota inexistente
app.use((req, res) => {
  res.send("Requisição não encontrada.")
})

const port = process.env.PORT || 3001

app.listen(port, function () {
  console.log("Running on port", port)
})

module.exports = app