/* eslint-disable no-undef */
const ConfigTest = require("../ConfigTest")

describe("Test UserController", function() {

    let testSession = null

    beforeEach(async function() {
        testSession = ConfigTest.session(ConfigTest.server)
        await testSession.post("/login").send({email: "admin@admin.com", password: "admin"})
    })

    afterAll(function() {
        ConfigTest.server.close()
    })

    it("It should response the POST method to register users", async function() {
        const response = await testSession.post("/user/register")
            .set("Content-Type", "multipart/form-data")
            .attach("csvFile", ConfigTest.fileUsuers)
        await expect(response.body.success).toBe(true)
    })
    
    it("It should response the POST method to invalid register users", async function() {
        const response = await testSession.post("/user/register")
        await expect(response.body.success).toBe(false)
    })
})