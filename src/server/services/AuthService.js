const jwt = require("jsonwebtoken")
const {promisify} = require("util")

const AuthService = module.exports = {

    expiresIn: 1800,
    cookieName: "jwtoken",
    secretKey: "$2a$08$6fqTLV8gmMYPw1ovcnHrBebo4M7mR3QDeO8MLoA8DdpWyxVWIgdP2",

    authenticate: async function(req, res, next) {
        try {
            const token = req.cookies.jwtoken
            req.user = await promisify(jwt.verify)(token, AuthService.secretKey)
            return next()
        } catch (error) {
            return res.status(401).send({sucess: false, error: "authentication failed"})
        }
    },

    generateToken: function(user, res) {
        const token = jwt.sign(user, AuthService.secretKey, {expiresIn: AuthService.expiresIn})
        res.cookie(AuthService.cookieName, token, {httpOnly: true, maxAge: AuthService.expiresIn * 1000})
    }

}