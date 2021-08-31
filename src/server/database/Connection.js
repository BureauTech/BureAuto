import mongoose from "mongoose"

const createConnection = (function () {

    let _localServidorDB = process.env.LOCAL_SERVIDOR_DB
    let _portaServidorDB = process.env.PORTA_SERVIDOR_DB
    let _banco = process.env.PORTA_SERVIDOR_DB

    let _connection = mongoose.connect(`mongodb://${process.env.LOCAL_SERVIDOR_DB}:${process.env.PORTA_SERVIDOR_DB}/`)
        .then(() => {
            console.log("Conexão com ao MongoDB iniciada.")
        })
        .catch((err) => {
            console.log("Falha ao se conectar ao MongoDB.\n Erro: "+err)
        })

    return {
        connection: _connection
    }

})()

export default createConnection