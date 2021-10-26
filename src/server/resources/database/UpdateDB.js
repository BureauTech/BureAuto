require("dotenv").config()
const {Pool} = require("pg")
const fs = require("fs")
const path = require("path")

const config = {
    host: process.env.HOST_DB,
    port: process.env.PORT_DB,
    user: process.env.USER_DB,
    password: process.env.PWD_DB,
    database: process.env.DATABASE_DB
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