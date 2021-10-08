const Connection = require("../database/Connection")
const ValidationUtils = require("../utils/ValidationUtils")

module.exports = {

    validateUser: async function(user) {
        const connection = await Connection
        
        const newDocument = ValidationUtils.validDocument(user.documento)
        user.tipoDocumento = newDocument.type
        if (!newDocument.valid) {
            return {valid: false, error: "documento inválido"}
        }

        const document = (await connection.query("select * from user_document_exists($1) exists", [user.documento]))[0]
        if (document.exists) {
            return {valid: false, error: "documento já cadastrado na plataforma"}
        }

        const email = (await connection.query("select * from user_email_exists($1) exists", [user.email]))[0]
        if (email.exists) {
            return {valid: false, error: "email já cadastrado na plataforma"}
        }

        return {valid: true}
    }

}