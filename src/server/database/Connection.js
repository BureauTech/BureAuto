const { Repository } = require("typeorm");
const typeorm = require("typeorm");
const Entities = require("./Entities");

let Connection = typeorm.createConnection({
    type: process.env.TYPE_DB,
    // url: "postgres://" + process.env.USER_DB + ":" + process.env.PWD_DB + "@" + process.env.HOST_DB + ":" + process.env.PORT_DB + "/" + process.env.DATABASE_DB,
    host: process.env.HOST_DB,
    port: process.env.PORT_DB,
    username: process.env.USER_DB,
    password: process.env.PWD_DB,
    database: process.env.DATABASE_DB,
    entities: Entities.list()
})

async function teste() {
    let repoCripto = await (await Connection).getRepository(Repository.criptografia)
    let cripto = await repoCripto.find()
    console.log(cripto)
}

module.exports = { Connection, teste }