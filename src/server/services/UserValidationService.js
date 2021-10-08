const ValidationUtils = require("../utils/ValidationUtils")

module.exports = {

    validate: function(user) {
        if (!ValidationUtils.validDocument(user.data.documento).valid) {
            return {valid: false, error: "documento inválido"}
        }
        return {valid: true}
    }

}