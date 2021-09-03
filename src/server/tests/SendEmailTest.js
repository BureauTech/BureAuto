require("dotenv").config({path: "../.env"})

const EmailServices = require("../services/EmailService")
const PasswordUtils = require("../utils/PasswordUtils")
const data = {usuSenha: PasswordUtils.randomPassword(), usuNome: "Charles"}
const template = "../templates/FirstPasswordTemplate.ejs"

EmailServices.sendEmail("BureAuto", "charles.ferreira.ramos@gmail.com", "senha gerada", template, data)