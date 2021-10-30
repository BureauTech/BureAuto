const password = require("secure-random-password")

module.exports = {

    randomPassword: function() {
        return password.randomPassword({
            length: 12,
            characters: [
                {characters: password.upper, exactly: 3},
                {characters: password.symbols, exactly: 2},
                {characters: password.digits, exactly: 3},
                {characters: password.lower, exactly: 4}
            ]
        })
    },

    isStrongPassword: function(password) {
        // length between [8, 16], at least 1 upper case, 1 lower case, 1 number, 1 symbol
        return password.match(/^(?=.*[A-Z])(?=.*[!@#$&*\.%])(?=.*[0-9])(?=.*[a-z]).{8,16}$/g)
    }

}