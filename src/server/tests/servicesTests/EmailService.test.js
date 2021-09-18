/* eslint-disable no-undef */
require("dotenv").config()

const EmailService = require("../../services/EmailService")
const PasswordUtils = require("../../utils/PasswordUtils")

describe("Test EmailService", function() {

    const testEmail = "testes.bureauto@gmail.com"
    const data = {senha: PasswordUtils.randomPassword(), nome: "Teste"}

    test("It should response the send first access email", async function() {
        const template = "templates/FirstAccessTemplate.ejs"
        const response = await EmailService.sendEmail("BureAuto", testEmail, "BureAuto - Primeiro Acesso", template, data)
        expect(response).toBe(true)
    })

    test("It should response the send new message email", async function() {
        const template = "templates/NewMessageTemplate.ejs"
        const response = await EmailService.sendEmail("BureAuto", testEmail, "📨 BureAuto - Você tem uma nova mensagem", template, data)
        expect(response).toBe(true)
    })

    test("It should response the send reset password email", async function() {
        const template = "templates/ResetPasswordTemplate.ejs"
        const response = await EmailService.sendEmail("BureAuto", testEmail, "🆘 BureAuto - Redefinição de Senha de Acesso", template, data)
        expect(response).toBe(true)
    })

})