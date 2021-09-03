require("dotenv").config({path: "../.env"})

const EmailServices = require("../services/EmailService")
const PasswordUtils = require("../utils/PasswordUtils")
const data = {usuSenha: PasswordUtils.randomPassword(), usuNome: "Wesley Dias"}
const template = "../templates/FirstAccessTemplate.ejs"

EmailServices.sendEmail("BureAuto", "wesley.dias3@fatec.sp.gov.br", "BureAuto - Primeiro Acesso", template, data)