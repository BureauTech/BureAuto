const fs = require("fs")
const Papa = require("papaparse")
const Repository = require("../database/Repository")

module.exports = {

    registerAdvertisement: function(filePath) {
        const file = fs.readFileSync(filePath, "utf8")

        Papa.parse(file, {
            delimiter: ";",
            header: true,
            skipEmptyLines: true,
            transformHeader: header => header.trim(),

            step: async function(advertisement) {
                const RepositoryAnuncio = await Repository.get(Repository.anuncio)
                await RepositoryAnuncio.save({
                    anu_usu_cod: 4,
                    anu_cod: advertisement.data.cod,
                    anu_nome_fabricante: advertisement.data.fabricante,
                    anu_descricao_modelo: advertisement.data.modelo,
                    anu_ano_fabricacao: advertisement.data.ano_fabricacao,
                    anu_ano_modelo: advertisement.data.ano_modelo,
                    anu_valor: advertisement.data.valor
                })
            },

            complete: function() {
                fs.unlink(filePath, () => {})
            }

        })
    }

}