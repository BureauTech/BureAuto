const fs = require("fs")
const Papa = require("papaparse")
const {Not} = require("typeorm")
const Repository = require("../database/Repository")
const Connection = require("../database/Connection")

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
                    adv_man_cod: 15,
                    adv_model_description: advertisement.data.modelo,
                    adv_year_manufacture: advertisement.data.ano_fabricacao,
                    adv_year_model: advertisement.data.ano_modelo,
                    adv_value: advertisement.data.valor.replace(",", ".")
                })
            },
            complete: async function() {
                fs.unlink(filePath, () => {})
            }
        })
    },

    getAllAdvertisement: async function() {
        const RepositoryAdvertisement= await Repository.get(Repository.Advertisement)
        return await RepositoryAdvertisement.find({relations: ["Manufacturer", "StatusType"], where: {adv_sty_cod: Not(2)}})
    },

    getAdvertisement: async function(adv_cod) {
        const RepositoryAdvertisement= await Repository.get(Repository.Advertisement)
        const advertisement = await RepositoryAdvertisement.findOne({
            relations: ["Manufacturer", "User"], where: {adv_cod: adv_cod, adv_sty_cod: Not(2)}
        })
        if (advertisement) {
            advertisement.use_is_cpf_document = advertisement.User.use_is_cpf_document
            delete advertisement.User
        }
        return advertisement
    },

    editAdvertisement: async function(adv_edt) {
        const RepositoryAdvertisement= await Repository.get(Repository.Advertisement)
        RepositoryAdvertisement.update({adv_cod: adv_edt.adv_cod}, adv_edt)
    },

    getNumberOfAds: async function() {
        const connection = await Connection
        return (await connection.query("select count(adv_sty_cod) as total_ads from advertisement where adv_sty_cod = 1"))[0]
    },

    deleteAdvertisement: async function(adv_cod, user) {
        const RepositoryAdvertisement= await Repository.get(Repository.Advertisement)
        const advertisement = await RepositoryAdvertisement.findOne({
            where: {
                adv_cod: adv_cod, adv_use_cod: user.use_cod, adv_sty_cod: Not(2)
            }
        })
        if (!advertisement) return
        advertisement.adv_sty_cod = 2
        return await RepositoryAdvertisement.save(advertisement)
    }
}
