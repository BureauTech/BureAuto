const router = require("express").Router()
const EmailService = require("../services/EmailService")
const ReportService = require("../services/ReportService")

// Mapeado em "/report"

router.get("/send", async(req, res) => {
    try {
        const {user} = req
        const template = "templates/ReportTemplate.ejs"
        const data = await ReportService.getAllReports(user)
        EmailService.sendEmail("BureAuto", user.use_email, "BureAuto - Relatório", template, {...user, ...data})
        return res.status(200).send({sucess: true})
    } catch (error) {
        console.log(error)
        return res.status(500).send({sucess: false, error: "an error occurred while processing the request"})
    }
})

module.exports = router