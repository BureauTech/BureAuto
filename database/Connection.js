const typeorm = require(typeorm)
const Entities = require(./Entities)

const Connection = typeorm.createConnection({
    type: process.env.TYPE_DB,
    host: process.env.HOST_DB,
    port: process.env.PORT_DB,
    username: process.env.USER_DB,
    password: process.env.PWD_DB,
    database: process.env.DATABASE_DB,
    entities: Entities.list(),
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = Connection