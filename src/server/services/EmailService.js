const ejs = require("ejs")
const nodemailer = require("nodemailer")

module.exports = {

    transporter: nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: process.env.EMAIL_SECURE === "true",
        auth: {user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD}
    }),

    sendEmail: async function(from, to, subject, template, data) {
        this.transporter.sendMail({
            from, to, subject, html: (await ejs.renderFile(template, data)).toString()
        })
    }

}