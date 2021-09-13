const app = require("../app")
const port = process.env.TEST_PORT || 3333

const contructorMain = (function() {

    const session = require("supertest-session")

    const server = app.listen(port)

    return {
        session: session,
        server: server
    }
    
})()

module.exports = contructorMain