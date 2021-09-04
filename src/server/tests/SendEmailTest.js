require("dotenv").config({path: "../.env"})

const EmailService = require("../services/EmailService")
const PasswordUtils = require("../utils/PasswordUtils")
const data = {usuSenha: PasswordUtils.randomPassword(), usuNome: "Wesley Dias"}
const template = "../templates/FirstAccessTemplate.ejs"

EmailService.sendEmail("BureAuto", "wesley.dias3@fatec.sp.gov.br", "BureAuto - Primeiro Acesso", template, data)