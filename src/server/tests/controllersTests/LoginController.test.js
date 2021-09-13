/* eslint-disable no-undef */
const app = require("../../app")
const session = require("supertest-session")
const server = app.listen(process.env.TEST_PORT || 3333)

describe("Test LoginController", function() {

    let testSession = null

    beforeEach(function() {
        testSession = session(server)
    })

    afterAll(function() {
        server.close()
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