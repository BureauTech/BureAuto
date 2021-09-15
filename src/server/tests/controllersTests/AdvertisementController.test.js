/* eslint-disable no-undef */
const ConfigTest = require("../ConfigTest")

describe("Test AdvertisementController", function() {

    let testSession = null

    beforeEach(async function() {
        testSession = ConfigTest.session(ConfigTest.server)
        await testSession.post("/login").send({email: "admin@admin.com", password: "admin"})
    })

    afterAll(function() {
        ConfigTest.server.close()
    })

    test("It should response the GET method to get all advertisements", async function() {
        const response = await testSession.get("/advertisement/all")
        await expect(response.body.success).toBe(true)
    })

    test("It should response the POST method to register advertisements", async function() {
        const response = await testSession.post("/advertisement/register")
            .set("Content-Type", "multipart/form-data")
            .attach("csvFile", ConfigTest.fileAdvertisements)
        await expect(response.body.success).toBe(true)
    })

    test("It should response the POST method to invalid register advertisements", async function() {
        const response = await testSession.post("/advertisement/register")
        await expect(response.body.success).toBe(false)
    })

})