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

    test("It should response the GET method to get all advertisements", async function() {
        const response = await testSession.get("/advertisement/all")
        expect(response.body.success).toBe(true)
    })

})