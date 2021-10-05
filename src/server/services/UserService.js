const fs = require("fs")
const Papa = require("papaparse")
const Repository = require("../database/Repository")
const PasswordUtils = require("../utils/PasswordUtils")
const EmailService = require("../services/EmailService")
const Connection = require("../database/Connection")

module.exports = {

    registerUser: async function(filePath) {
        const file = fs.readFileSync(filePath, "utf8")
        Papa.parse(file, {
            delimiter: ";",
            header: true,
            skipEmptyLines: true,
            transformHeader: header => header.trim(),
            step: async function(user, parser) {
                parser.pause()
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
                setTimeout(function() {
                    parser.resume()
                }, 500)
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
    },

    changePassword: async function(user, password) {
        const template = "templates/ChangePasswordTemplate.ejs"
        const data = {nome: user.use_name, senha: password}
        const RepositoryUser = await Repository.get(Repository.User)
        await RepositoryUser.save({
            use_cod: user.use_cod,
            use_password: data.senha,
            use_is_temp_password: false
        })
        EmailService.sendEmail("BureAuto", user.use_email, "BureAuto - Senha alterada", template, data)
    },

    deleteUser: async function(use_cod) {
        debugger
        const connection = await Connection
        const user = (await connection
            .query("select * from decrypt_user($1)", [use_cod]))[0]
        const RepositoryCryptography = await Repository.get(Repository.Cryptography)
        const response = await RepositoryCryptography.delete({cry_use_cod: use_cod})
        if (!response.affected) {
            return false
        }
        const template = "../templates/DeleteAccount.ejs"
        const data = {nome: user.use_name}
        EmailService.sendEmail("BureaAuto", user.use_email, "BureAuto - Exclusão de Conta", template, data)
        return true
    },

    updateUser: async function(use_edt) {
        const RepositoryUser = await Repository.get(Repository.User)
        RepositoryUser.update({use_cod: use_edt.use_cod}, use_edt)
    },

    getAllUsers: async function() {
        const RepositoryCryptography = await Repository.get(Repository.Cryptography)
        const RepositoryUser = await Repository.get(Repository.User)

        const returnCryptography = await RepositoryCryptography.find()

        const returnUsers = await Promise.all(returnCryptography.map(async(cryptography) => {
            return (await RepositoryUser.query(`SELECT * from decrypt_user(${cryptography.cry_use_cod})`))[0]
        }))
        return returnUsers
    },
    getAllUsersToAdm: async function(use_cod) {
        const RepositoryCryptography = await Repository.get(Repository.Cryptography)
        const RepositoryUser = await Repository.get(Repository.User)

        const returnCryptography = await RepositoryCryptography.find()

        const returnUsers = await Promise.all(returnCryptography.map(async(cryptography) => {
            return (await RepositoryUser.query(`SELECT * from decrypt_user(${cryptography.cry_use_cod})`))[0]
        }))
        const usersToAdm = returnUsers.filter((user) => user.use_cod !== use_cod)
        return usersToAdm
    }


}