/* eslint-disable no-undef */
const ConfigTest = require("../ConfigTest")

describe("Test ResetPasswordController", function() {

    let testSession = null

    beforeEach(async function() {
        testSession = ConfigTest.session(ConfigTest.server)
    })

    afterAll(function() {
        ConfigTest.server.close()
    })

    test("It should response the POST method to request reset password.", async function() {
        const response = await testSession.post("/reset-password").send({email: "testes.bureauto@gmail.com"})
        await expect(response.body.success).toBe(true)
    })

    test("It should response the POST method to invalid request reset password.", async function() {
        const response = await testSession.post("/reset-password").send({email: "bureauto@gmail.com"})
        await expect(response.body.success).toBe(false)
    })

    // test("It should response the POST method whit invalid password to reset password.", async function() {
    //     await testSession.post("/login").send({email: "ferreira.ramos+1@gmail.com", password: "wrong"})
    //     const response = await testSession.post("/reset-password").send({email: "ferreira.ramos+1@gmail.com", newPassword: "newPassord"})
    //     await expect(response.body.success).toBe(false)
    // })

    // test("It should response the POST method whit invalid password to reset password.", async function() {
    //     await testSession.post("/login").send({email: "ferreira.ramos+1@gmail.com", password: "wrong"})
    //     const response = await testSession.post("/reset-password").send({email: "ferreira.ramos+1@gmail.com", newPassword: "newPassord"})
    //     await expect(response.body.success).toBe(false)
    // })

})