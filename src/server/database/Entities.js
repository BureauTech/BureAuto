//Mapeamento de entidades
module.exports = {
    criptografia: require("./models/Criptografia"),
    anuncio: require("./models/Anuncio"),
    usuario: require("./models/Usuario"),

    list: function() {
        return Object.values(this)
    }
}