const {Pool} = require("pg")
const fs = require("fs")
const path = require("path")

// Instalar a biblioteca pg || npm install -save pg
// Se atentar as configurações do DB antes de executar o script.
// Esse script só executa para a base <bureauto> já criada.
const config = {
    host: "localhost",
    user: "postgres",
    password: "12345678",
    database: "bureauto",
    port: 5432
}

const pool = new Pool(config)
const files = fs.readdirSync(__dirname).filter(file => file.includes(".sql"))
const sqlFile = files[files.length - 1]

const sql_ddl_bureauto = fs.readFileSync(path.join(__dirname, sqlFile)).toString()

pool.connect(async function(err, client, done) {
    if (err) {
        console.error("Can not connect to the DB" + err)
    }

    await client.query(sql_ddl_bureauto, function(err, result) {
        if(err) {
            console.error("error: ", err)
            process.exit(1)
        }
        console.log("Success on execut ddl project.")
        process.exit(0)
    })
})