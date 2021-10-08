const Connection = require("../database/Connection")
const ValidationUtils = require("../utils/ValidationUtils")

module.exports = {

    validateUser: async function(user) {
        const connection = await Connection
        
        const statusDocument = ValidationUtils.validDocument(user.documento)
        user.tipoDocumento = statusDocument.type

        if (!statusDocument.valid) {
            return {valid: false, error: "documento inválido"}
        }

        const email = (await connection.query("select * from user_email_exists($1) exists", [user.email]))[0]
        if (email.exists) {
            return {valid: false, error: "email já cadastrado na plataforma"}
        }

        return {valid: true}
    }

}