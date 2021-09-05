require("dotenv").config({path: "../.env"})

const EmailService = require("../services/EmailService")
const PasswordUtils = require("../utils/PasswordUtils")
const data = {senha: PasswordUtils.randomPassword(), nome: "Seu Nome"}
const template = "../templates/ResetPasswordEmailTemplate.ejs"

EmailService.sendEmail("BureAuto", "charles.ferreira.ramos@gmail.com", "🆘 BureAuto - Redefinição de Senha de Acesso", template, data)