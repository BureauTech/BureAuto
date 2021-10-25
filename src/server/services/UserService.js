const fs = require("fs")
const Papa = require("papaparse")
const Repository = require("../database/Repository")
const PasswordUtils = require("../utils/PasswordUtils")
const EmailService = require("../services/EmailService")
const UserValidationService = require("../services/UserValidationService")
const Connection = require("../database/Connection")

module.exports = {

    registerUser: function(filePath) {
        const file = fs.readFileSync(filePath, "utf8")
        return new Promise(function(resolve) {
            Papa.parse(file, {
                delimiter: ";",
                header: true,
                skipEmptyLines: true,
                transformHeader: header => header.trim(),
                complete: async function(results) {
                    const errors = []
                    for (const user of results.data) {
                        const response = await UserValidationService.validateUser(user)
                        if (!response.valid) {
                            user.motivo = response.error
                            errors.push(user)
                        } else {
                            user.senha = PasswordUtils.randomPassword()
                            const RepositoryUser = await Repository.get(Repository.User)
                            await RepositoryUser.save({
                                use_name: user.nome,
                                use_is_cpf_document: user.tipoDocumento === "cpf",
                                use_document: user.documento.replace(/\D/g, ""),
                                use_nickname: user.apelido,
                                use_phone: user.telefone,
                                use_address: user.endereco,
                                use_email: user.email,
                                use_password: user.senha,
                                use_is_temp_password: true
                            })
                            const template = "templates/FirstAccessTemplate.ejs"
                            EmailService.sendEmail("BureAuto", user.email, "BureAuto - Primeiro Acesso", template, user)
                        }
                        fs.unlink(filePath, () => {})
                        resolve(Papa.unparse(errors, {delimiter: ";", newline: "\n"}))
                    }
                }

            })
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
        const connection = await Connection
        const user = (await connection
            .query("select * from decrypt_user($1)", [use_cod]))[0]
        const RepositoryCryptography = await Repository.get(Repository.Cryptography)
        const response = await RepositoryCryptography.delete({cry_use_cod: use_cod})
        if (!response.affected) {
            return false
        }
        const template = "templates/DeleteAccount.ejs"
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
    }

}