const fs = require("fs")
const Papa = require("papaparse")
const Repository = require("../database/Repository")
const PasswordUtils = require("../utils/PasswordUtils")
const EmailService = require("../services/EmailService")

module.exports = {

    registerUser: function(filePath) {
        const file = fs.readFileSync(filePath, "utf8")

        Papa.parse(file, {
            delimiter: ";",
            header: true,
            skipEmptyLines: true,
            transformHeader: header => header.trim(),

            step: async function(user) {
                user.data.senha = PasswordUtils.randomPassword()
                const RepositoryUsuario = await Repository.get(Repository.usuario)
                await RepositoryUsuario.save({
                    usu_nome: user.data.nome,
                    usu_is_cpf: true,
                    usu_documento: user.data.cpf,
                    usu_apelido: user.data.apelido,
                    usu_telefone: user.data.telefone,
                    usu_endereco: user.data.endereco,
                    usu_email: user.data.email,
                    usu_senha: user.data.senha,
                    usu_is_temp: true
                })
                const template = "templates/FirstAccessTemplate.ejs"
                EmailService.sendEmail("BureAuto", user.data.email, "BureAuto - Primeiro Acesso", template, user.data)
            },

            complete: function() {
                fs.unlink(filePath, () => {})
            }

        })
    },

    resetUserPassword: async function(user) {
        const template = "templates/ResetPasswordEmailTemplate.ejs"
        const data = {nome: user.usu_nome, senha: PasswordUtils.randomPassword()}
        const RepositoryUsuario = await Repository.get(Repository.usuario)
        await RepositoryUsuario.save({
            usu_cod: user.usu_cod,
            usu_senha: data.senha,
            usu_is_temp: true
        })
        EmailService.sendEmail("BureAuto", user.usu_email, "BureAuto - Troca de Senha", template, data)
    }

}