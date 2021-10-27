require("dotenv").config()
const {Pool} = require("pg")
const fs = require("fs")
const path = require("path")

const config = {
<<<<<<< HEAD
    host: "localhost",
    user: "postgres",
    password: "12345678",
    database: "bureauto",
    port: 5432
=======
    host: process.env.HOST_DB,
    port: process.env.PORT_DB,
    user: process.env.USER_DB,
    password: process.env.PWD_DB,
    database: process.env.DATABASE_DB
>>>>>>> d3f378efcf5c370f04544a84cc4a02762155b909
}

const pool = new Pool(config)
const files = fs.readdirSync(__dirname).filter(file => file.includes(".sql"))
const sqlFileName = files[files.length - 1]
const sqlFile = fs.readFileSync(path.join(__dirname, sqlFileName)).toString()

pool.connect(function(err, client) {
    if (err) {
        console.error("cant connect to database ", err)
    }
    client.query(sqlFile, function(err) {
        if(err) {
            console.error("error: ", err)
            process.exit(1)
        }
        console.log("database updated successfully")
        process.exit(0)
    })
})