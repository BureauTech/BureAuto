const fs = require("fs")
const Papa = require("papaparse")
const Repository = require("../database/Repository")

module.exports = {

    registerAdvertisement: async function(filePath) {
        const file = fs.readFileSync(filePath, "utf8")
        Papa.parse(file, {
            delimiter: ";",
            header: true,
            skipEmptyLines: true,
            transformHeader: header => header.trim(),
            step: async function(advertisement) {
                const RepositoryAdvertisement= await Repository.get(Repository.Advertisement)
                await RepositoryAdvertisement.save({
                    adv_use_cod: 1,
                    adv_man_cod: 1,
                    adv_model_description: advertisement.data.modelo,
                    adv_year_manufacture: advertisement.data.ano_fabricacao,
                    adv_year_model: advertisement.data.ano_modelo,
                    adv_value: advertisement.data.valor
                })
            },
            complete: async function() {
                fs.unlink(filePath, () => {})
            }
        })
    }

}