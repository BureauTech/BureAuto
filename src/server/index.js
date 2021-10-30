const {httpServer} = require("./app")
require("./services/IoServices")
const port = process.env.PORT || 3000

httpServer.listen(port, function() {
    console.log("Running on port", port)
})