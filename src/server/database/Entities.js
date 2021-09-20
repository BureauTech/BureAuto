module.exports = {

    Cryptography: require("./models/Cryptography"),
    Advertisement: require("./models/Advertisement"),
    User: require("./models/User"),
    Manufacturer: require("./models/Manufacturer"),
    Favorite: require("./models/Favorite"),
    Chat: require("./models/Chat"),
    Message: require("./models/Message"),

    list: function() {
        return Object.values(this)
    }

}