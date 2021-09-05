require("dotenv").config({path: "../.env"})

const EmailService = require("../services/EmailService")
const PasswordUtils = require("../utils/PasswordUtils")
const data = {senha: PasswordUtils.randomPassword(), nome: "Seu Nome"}
const template = "../templates/NewMessage.ejs"

EmailService.sendEmail("BureAuto", "seu_email@email.com", "📨 BureAuto - Você tem uma nova mensagem", template, data)