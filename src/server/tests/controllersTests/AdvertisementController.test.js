/* eslint-disable no-undef */
const app = require("../../app")
const session = require("supertest-session")
const server = app.listen(process.env.TEST_PORT || 3333)

describe("Test AuthController", function() {

    let testSession = null

    beforeEach(function() {
        testSession = session(server)
    })

    afterAll(function() {
        server.close()
    })

    test("It should response the GET method to get all advertisements", async function() {
        const response = await testSession.get("/advertisement/all")
        expect(response.body.success).toBe(true)
    })

})