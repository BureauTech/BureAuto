const jwt = require("jsonwebtoken")
const {promisify} = require("util")
const secret = "$2a$08$6fqTLV8gmMYPw1ovcnHrBebo4M7mR3QDeO8MLoA8DdpWyxVWIgdP2"
const expiresIn = 1800

module.exports = {
    
    authenticate: async function(req, res, next) {
        try {
            const token = req.cookies.jwtoken
            const decoded = await promisify(jwt.verify)(token, secret)
            req.user = decoded
            return next()
        } catch (error) {
            return res.status(401).send({sucess: false, error: "Token invalid"})
        }
    },

    generateToken: function(user, res) {
        const token = jwt.sign(user, secret, {expiresIn: expiresIn})
        res.cookie("jwtoken", token, {httpOnly: true, maxAge: expiresIn * 1000})
    }

}