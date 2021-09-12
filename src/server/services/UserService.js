const fs = require("fs")
const Papa = require("papaparse")
const Repository = require("../database/Repository")
const PasswordUtils = require("../utils/PasswordUtils")
const EmailService = require("../services/EmailService")

module.exports = {

    registerUser: async function(filePath) {
        const file = fs.readFileSync(filePath, "utf8")
        Papa.parse(file, {
            delimiter: ";",
            header: true,
            skipEmptyLines: true,
            transformHeader: header => header.trim(),
            step: async function(user) {
                user.data.senha = PasswordUtils.randomPassword()
                const RepositoryUser = await Repository.get(Repository.User)
                await RepositoryUser.save({
                    use_name: user.data.nome,
                    use_is_cpf_document: true,
                    use_document: user.data.cpf,
                    use_nickname: user.data.apelido,
                    use_phone: user.data.telefone,
                    use_address: user.data.endereco,
                    use_email: user.data.email,
                    use_password: user.data.senha,
                    use_is_temp_password: true
                })
                const template = "templates/FirstAccessTemplate.ejs"
                EmailService.sendEmail("BureAuto", user.data.email, "BureAuto - Primeiro Acesso", template, user.data)
            },
            complete: async function() {
                fs.unlink(filePath, () => {})
            }
        })
    },

    resetUserPassword: async function(user) {
        const template = "templates/ResetPasswordTemplate.ejs"
        const data = {nome: user.use_name, senha: PasswordUtils.randomPassword()}
        const RepositoryUser = await Repository.get(Repository.User)
        await RepositoryUser.save({
            use_cod: user.use_cod,
            use_password: data.senha,
            use_is_temp_password: true
        })
        EmailService.sendEmail("BureAuto", user.use_email, "🆘 BureAuto - Troca de Senha", template, data)
    }

}