//Mapeamento de entidades
module.exports = {
    criptografia: require("./models/Criptografia"),

    list: function() {
        return Object.values(this)
    }
}