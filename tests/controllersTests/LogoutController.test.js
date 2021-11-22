/* eslint-disable no-undef */
const ConfigTest = require("../ConfigTest")

describe("Test LogoutController", function() {

    let testSession = null

    beforeEach(function() {
        testSession = ConfigTest.session(ConfigTest.server)
    })

    afterAll(function() {
        ConfigTest.server.close()
    })

    test("It should response the GET method with valid logout", async function() {
        const response = await testSession.get("/logout")
        expect(response.body.success).toBe(true)
    })

})