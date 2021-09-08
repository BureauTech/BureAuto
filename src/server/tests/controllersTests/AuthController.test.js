/* eslint-disable no-undef */
const app = require("../../index.js")
const session = require("supertest-session")

let testSession = null

describe("Test AuthController", function() {

    beforeEach(function() {
        testSession = session(app)
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