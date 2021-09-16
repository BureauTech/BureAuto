module.exports = {

    Cryptography: require("./models/Cryptography"),
    Advertisement: require("./models/Advertisement"),
    User: require("./models/User"),
    Manufacturer: require("./models/Manufacturer"),

    list: function() {
        return Object.values(this)
    }

}