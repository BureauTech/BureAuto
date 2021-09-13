/* eslint-disable no-undef */
const ConfigTest = require("../ConfigTest")

describe("Test LoginController", function() {

    let testSession = null

    beforeEach(function() {
        testSession = ConfigTest.session(ConfigTest.server)
    })

    afterAll(function() {
        ConfigTest.server.close()
    })

    test("It should response the GET method with valid login", async function() {
        const response = await testSession.post("/login").send({email: "admin@admin.com", password: "admin"})
        expect(response.body.success).toBe(true)
    })

    test("It should response the GET method with invalid login", async function() {
        const response = await testSession.post("/login").send({email: "admin@admin.com", password: "wrong"})
        expect(response.body.success).toBe(false)
    })

})