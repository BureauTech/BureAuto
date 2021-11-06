const fs = require("fs")
const Papa = require("papaparse")
const {Not, ILike, In, LessThanOrEqual, MoreThanOrEqual, Between} = require("typeorm")
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
            relations: ["Manufacturer", "StatusType"],
            select: ["adv_cod", "adv_model_description", "adv_value", "adv_images", "adv_year_manufacture", "adv_year_model"],
            where: {adv_sty_cod: 1}
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
            relations: ["Manufacturer", "User"], where: {adv_cod: adv_cod, adv_sty_cod: 1}
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

    searchAdvertisement: async function(filters) {
        if(typeof filters === "string") filters = JSON.parse(filters)
        const filter = await this.mountFilters(filters)
        const RepositoryAdvertisement= await Repository.get(Repository.Advertisement)
        const advertisement = await RepositoryAdvertisement.find({
            relations: ["Manufacturer", "StatusType"],
            where: filter
        })
        return advertisement
    },

    returnFilters: function(advertisements) {
        const response = {
            brand: {brands: []},
            model: {models: []},
            yearModel: {yearModels: []},
            value: {values: [], min: undefined, max: undefined}
        }
        
        for (const advertisement of advertisements) {
            response.brand.brands.push(advertisement.Manufacturer.man_name)
            response.model.models.push(advertisement.adv_model_description)
            response.yearModel.yearModels.push("".concat(advertisement.adv_year_manufacture, "-", advertisement.adv_year_model))
            response.value.values.push(advertisement.adv_value)
        }

        response.brand.brands = [... new Set(response.brand.brands)]
        response.model.models = [... new Set(response.model.models)]
        response.yearModel.yearModels = [... new Set(response.yearModel.yearModels)]
        response.value.values = [... new Set(response.value.values)]
        response.value.min = Math.min(...response.value.values)
        response.value.max = Math.max(...response.value.values)
        delete response.value.values

        return response
    },

    incrementViews: async function(adv_cod) {
        const manager = (await Repository.get(Repository.Advertisement)).manager
        const {affected} = await manager.increment(Repository.Advertisement, {adv_cod: adv_cod}, "adv_views", 1)
        return affected
    },

    getReportViewContact: async function(use_cod) {
        const RepositoryAdvertisement = await Repository.get(Repository.Advertisement)
        const {totalViews} = await RepositoryAdvertisement.createQueryBuilder("advertisement")
            .select("SUM(advertisement.adv_views)", "totalViews")
            .where("advertisement.adv_use_cod = :adv_use_cod", {adv_use_cod: use_cod})
            .getRawOne()
        
        if (!totalViews) {
            return {totalViews: 0, totalContacts: 0, report: 0}
        }

        const RepositoryChat = await Repository.get(Repository.Chat)
        const allUserAdvertisements = await RepositoryAdvertisement.find({where: {adv_use_cod: use_cod}, select: ["adv_cod"]})
        const allUserAdvertisementsCod = allUserAdvertisements.map(adv => Number(adv.adv_cod))

        const totalContacts = await RepositoryChat.count({cha_adv_cod: In(allUserAdvertisementsCod)})
        if (!totalContacts) {
            return {totalViews: totalViews, totalContacts: totalContacts, report: 0}
        }

        const totalViewsByContacts = (totalViews / totalContacts).toFixed(0)
        return {totalViews: totalViews, totalContacts: totalContacts, report: totalViewsByContacts}
    },
    
    getStatusReport: async function() {
        const RepositoryAdvertisement = await Repository.get(Repository.Advertisement)
        const statusReport = await RepositoryAdvertisement.createQueryBuilder(Repository.Advertisement)
            .select("sty_description", "status").addSelect("count(sty_cod)", "total")
            .leftJoin("Advertisement.StatusType", "status").groupBy("sty_cod").getRawMany()
        return statusReport
    },

    getAdminReportViewContact: async function() {
        const AdvertisementRepository = await Repository.get(Repository.Advertisement)
        const {totalViews} = await AdvertisementRepository.createQueryBuilder("advertisement")
            .select("SUM(advertisement.adv_views)", "totalViews")
            .getRawOne()
        
        if (!totalViews) {
            return {totalViews: 0, totalContacts: 0, report: 0}
        }

        const ChatRepository = await Repository.get(Repository.Chat)
        const totalContacts = await ChatRepository.count()
        if (!totalContacts) {
            return {totalViews: totalViews, totalContacts: totalContacts, report: 0}
        }

        const totalViewsByContacts = (totalViews / totalContacts).toFixed(0)
        return {totalViews: totalViews, totalContacts: totalContacts, report: totalViewsByContacts}
    },

    getSoldAdvertisementsReport: async function(use_cod) {
        const AdvertisementRepository = await Repository.get(Repository.Advertisement)
        const sold = await AdvertisementRepository.count({adv_use_cod: use_cod, adv_sty_cod: 4})
        const totalQuantity = await AdvertisementRepository.count({adv_use_cod: use_cod, adv_sty_cod: In([1, 4])})
        if (!totalQuantity) return {sold, percentage: "0,00%"}
        return {sold, percentage: `${(sold / totalQuantity * 100).toFixed(2)}%`.replace(".", ",")}
    },

    getSoldByCategoryReport: async function(use_cod) {
        const AdvertisementRepository = await Repository.get(Repository.Advertisement)
        const categoriesMap = {
            adv_brand: "Marca mais vendida",
            adv_model_description: "Modelo mais vendido",
            adv_year_model: "Ano do modelo mais vendido"
        }
        const categories = ["adv_brand", "adv_model_description", "adv_year_model"]
        const report = []
        for (let i = 0; i < categories.length; i++) {
            const result = await (await AdvertisementRepository.createQueryBuilder(Repository.Advertisement)
                .select(`Advertisement.${categories[i]}`, "category")
                .addSelect(`count(Advertisement.${categories[i]})`, "totalSold")
                .where("Advertisement.adv_use_cod = :adv_use_cod", {adv_use_cod: use_cod})
                .andWhere("Advertisement.adv_sty_cod = :adv_sty_cod", {adv_sty_cod: 4})
                .groupBy(`Advertisement.${categories[i]}`)
                .orderBy("\"totalSold\"", "DESC")
                .limit(1)
                .getRawMany())[0]
            report.push({category: categoriesMap[categories[i]], result: result.category ? result.category : "Não encontrado"})
        }
        return report
    },

    getSoldByCategoryAdminReport: async function() {
        const AdvertisementRepository = await Repository.get(Repository.Advertisement)
        const categoriesMap = {
            adv_brand: "Marca mais vendida",
            adv_model_description: "Modelo mais vendido",
            adv_year_model: "Ano do modelo mais vendido"
        }
        const categories = ["adv_brand", "adv_model_description", "adv_year_model"]
        const report = []
        for (let i = 0; i < categories.length; i++) {
            const result = await (await AdvertisementRepository.createQueryBuilder(Repository.Advertisement)
                .select(`Advertisement.${categories[i]}`, "category")
                .addSelect(`count(Advertisement.${categories[i]})`, "totalSold")
                .where("Advertisement.adv_sty_cod = :adv_sty_cod", {adv_sty_cod: 4})
                .groupBy(`Advertisement.${categories[i]}`)
                .orderBy("\"totalSold\"", "DESC")
                .limit(1)
                .getRawMany())[0]
            report.push({category: categoriesMap[categories[i]], result: result.category ? result.category : "Não encontrado"})
        }
        return report
    },

    getTimeReport: async function(use_cod) {
        const AdvertisementRepository = await Repository.get(Repository.Advertisement)
        const differences = await AdvertisementRepository.createQueryBuilder(Repository.Advertisement)
            .select("EXTRACT(EPOCH FROM (select now() - Advertisement.adv_created_at))", "difference")
            .where("Advertisement.adv_use_cod = :adv_use_cod", {adv_use_cod: use_cod})
            .andWhere("Advertisement.adv_sty_cod in (:...adv_sty_cod)", {adv_sty_cod: [1, 3]})
            .getRawMany()
        
        const totalTime = differences.reduce((acumulator, num) => acumulator += num.difference, 0)
        
        const totalPausedTime = (await AdvertisementRepository.createQueryBuilder(Repository.Advertisement)
            .select("SUM(Advertisement.adv_total_stopped)", "totalPaused")
            .where("Advertisement.adv_use_cod = :adv_use_cod", {adv_use_cod: use_cod})
            .andWhere("Advertisement.adv_sty_cod in (:...adv_sty_cod)", {adv_sty_cod: [1, 3]})
            .getRawMany())[0].totalPaused
        
        const advertisementQuantity  = await AdvertisementRepository.count({adv_use_cod: use_cod, adv_sty_cod: In([1, 3])})
        const total = totalTime.toFixed(0) - totalPausedTime
        
        const averageInSeconds = (total / advertisementQuantity).toFixed(0)
        const time = (new Date(averageInSeconds * 1000).toISOString().substr(11, 8)).split(":").map(e => Number(e))
        return `${Math.floor(total / 86400)} dia(s), ${(time[0])} hora(s), ${(time[1])} minuto(s), ${(time[2])} segundo(s)`
    },

    mountFilters: async function(filters) {
        let filter = {adv_sty_cod: 1}
        if(filters.brand) {
            filter["Manufacturer"] = {man_name: filters.brand}
        }
        if (filters.model) {
            filter["adv_model_description"] = filters.model
        } 
        if (filters.yearManModel) {
            const manModel = filters.yearManModel.split("-")
            filter["adv_year_model"] = LessThanOrEqual(manModel[1])
            filter["adv_year_manufacture"] = MoreThanOrEqual(manModel[0])
        }
        if (filters.valueMinMax) {
            filter["adv_value"] = Between(filters.valueMinMax[0], filters.valueMinMax[1])
        }
        if (filters.term) {
            filter = [
                {adv_description: ILike(`%${filters.term}%`), adv_sty_cod: 1},
                {adv_model_description: ILike(`%${filters.term}%`), adv_sty_cod: 1},
                {Manufacturer: {man_name: ILike(`%${filters.term}%`)}} 
            ]
        }
        return filter
    }
}

