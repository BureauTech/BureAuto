/* eslint-disable no-undef */
const app = require("../../app.js")
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

    test("It should response the GET method with valid auth", async function() {
        await testSession.post("/login").send({email: "admin@admin.com", password: "admin"})
        const response = await testSession.get("/auth")
        expect(response.body.success).toBe(true)
    })

    test("It should response the GET method with invalid auth", async function() {
        await testSession.post("/login").send({email: "admin@admin.com", password: "wrong"})
        const response = await testSession.get("/auth")
        expect(response.body.success).toBe(false)
    })

})