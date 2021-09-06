module.exports = {

    Cryptography: require("./models/Cryptography"),
    Advertisement: require("./models/Advertisement"),
    User: require("./models/User"),

    list: function() {
        return Object.values(this)
    }

}