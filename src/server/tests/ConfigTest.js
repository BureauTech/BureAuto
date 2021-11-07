const fs = require("fs")
const path = require("path")
const {app} = require("../app")
const port = process.env.TEST_PORT || 3333

const contructorMain = (function() {
    let dirFiles = process.cwd() + "/resources/files/"
    dirFiles = path.resolve(dirFiles) + path.normalize("/")
    
    const session = require("supertest-session")

    const server = app.listen(port)

    const fileUsuers = fs.readFileSync(dirFiles + "Exemplo_Usuarios.csv")
    const fileAdvertisements = fs.readFileSync(dirFiles + "Exemplo_Anuncios.csv")

    return {
        session: session,
        server: server,
        fileUsuers: fileUsuers,
        fileAdvertisements: fileAdvertisements
    }
    
})()

module.exports = contructorMain