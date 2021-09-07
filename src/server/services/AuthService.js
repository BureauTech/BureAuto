const jwt = require("jsonwebtoken")
const {promisify} = require("util")

const AuthService = module.exports = {

    expiresIn: 1800,
    cookieName: "jwtoken",
    secretKey: "$2a$10$VXQnRiZbWyDaPcTHxi7V/egucIrqjoYFTMzSQ98bFJC7a6LMW5q/.",

    authenticate: async function(req, res, next) {
        try {
            const token = req.cookies.jwtoken
            req.user = await promisify(jwt.verify)(token, AuthService.secretKey)
            return next()
        } catch (error) {
            return res.status(200).send({success: false, error: "authentication failed"})
        }
    },

    generateToken: function(user, res) {
        const token = jwt.sign(user, AuthService.secretKey, {expiresIn: AuthService.expiresIn})
        res.cookie(AuthService.cookieName, token, {httpOnly: true, maxAge: AuthService.expiresIn * 1000})
    }

}