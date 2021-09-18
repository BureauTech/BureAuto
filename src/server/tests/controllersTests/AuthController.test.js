/* eslint-disable no-undef */
const ConfigTest = require("../ConfigTest")

describe("Test AuthController", function() {

    let testSession = null

    beforeEach(function() {
        testSession = ConfigTest.session(ConfigTest.server)
    })

    afterAll(function() {
        ConfigTest.server.close()
    })

    it("It should response the POST method with valid auth", async function() {
        await testSession.post("/login").send({email: "admin@admin.com", password: "admin"})
        const response = await testSession.get("/auth")
        expect(response.body.success).toBe(true)
    })

    it("It should response the POST method with invalid auth", async function() {
        await testSession.post("/login").send({email: "admin@admin.com", password: "wrong"})
        const response = await testSession.get("/auth")
        expect(response.body.success).toBe(false)
    })

})