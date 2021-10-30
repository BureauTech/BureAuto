require("./services/IoServices")

const {httpServer} = require("./app")
const port = process.env.PORT || 3000

httpServer.listen(port, function() {
    console.log("Running on port", port)
})