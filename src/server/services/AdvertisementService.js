const fs = require("fs")
const Papa = require("papaparse")
const {Not, ILike} = require("typeorm")
const Repository = require("../database/Repository")
const Connection = require("../database/Connection")
const AdvertisementValidationService = require("./AdvertisementValidationService")

module.exports = {

    registerAdvertisement: async function(filePath, use_cod) {
        const file = fs.readFileSync(filePath, "utf8")
        return new Promise(function(resolve) {
            Papa.parse(file, {
                delimiter: ";",
                header: true,
                skipEmptyLines: true,
                transformHeader: header => header.trim(),
                complete: async function(results) {
                    const errors = []
                    for (const advertisement of results.data) {
                        const response = await AdvertisementValidationService.validateAdvertisement(advertisement)
                        if (!response.valid) {
                            advertisement.motivo = response.error
                            errors.push(advertisement)
                        } else {
                            const RepositoryAdvertisement= await Repository.get(Repository.Advertisement)
                            await RepositoryAdvertisement.save({
                                adv_use_cod: use_cod,
                                adv_man_cod: advertisement.adv_man_cod,
                                adv_model_description: advertisement.modelo,
                                adv_year_manufacture: advertisement.ano_fabricacao,
                                adv_year_model: advertisement.ano_modelo,
                                adv_year_brand: advertisement.marca,
                                adv_value: advertisement.valor.replace(",", ".")
                            })
                        }
                        fs.unlink(filePath, () => {})
                        resolve(Papa.unparse(errors, {delimiter: ";", newline: "\n"}))
                    }
                }
            })
        })
    },

    getAllAdvertisement: async function() {
        const RepositoryAdvertisement= await Repository.get(Repository.Advertisement)
        return await RepositoryAdvertisement.find({
            relations: ["Manufacturer", "StatusType"], where: {adv_sty_cod: 1},
            select: ["adv_cod", "adv_model_description", "adv_value", "adv_images"]
        })
    },

    getMaxAdvertisementValue: async function() {
        const RepositoryAdvertisement= await Repository.get(Repository.Advertisement)
        const response = await RepositoryAdvertisement.createQueryBuilder("advertisement")
            .select("MAX(advertisement.adv_value)", "max")
            .getRawOne()
        return response.max
    },

    getMinAdvertisementValue: async function() {
        const RepositoryAdvertisement= await Repository.get(Repository.Advertisement)
        const response = await RepositoryAdvertisement.createQueryBuilder("advertisement")
            .select("MIN(advertisement.adv_value)", "min")
            .getRawOne()
        return response.min
    },

    getAllAdvertisementByUser: async function(adv_use_cod) {
        const RepositoryAdvertisement= await Repository.get(Repository.Advertisement)
        return await RepositoryAdvertisement.find({
            relations: ["Manufacturer", "StatusType"], where: {adv_use_cod: adv_use_cod, adv_sty_cod: Not(2)}
        })
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
    },

    searchAdvertisement: async function(term) {
        const RepositoryAdvertisement= await Repository.get(Repository.Advertisement)
        const advertisement = await RepositoryAdvertisement.find({
            relations: ["Manufacturer", "StatusType"],
            where: [
                {adv_description: ILike(`%${term}%`), adv_sty_cod: 1},
                {adv_model_description: ILike(`%${term}%`), adv_sty_cod: 1},
                {Manufacturer: {man_name: ILike(`%${term}%`)}}
            
            ]
        })
        return advertisement
    }
}
