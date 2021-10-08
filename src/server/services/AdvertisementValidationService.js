const Repository = require("../database/Repository")
const {ILike} = require("typeorm")

module.exports = {

    validateAdvertisement: async function(advertisement) {
        const fields = ["fabricante", "modelo", "descricao", "ano_fabricacao", "ano_modelo", "valor", "marca"]
        for (const field of fields) {
            if (!advertisement[field]) {
                return {valid: false, error: `campo '${field}' não informado`}
            }
        }

        for (const field of fields.slice(3, 6)) {
            if (Number.isNaN(Number(advertisement[field]))) {
                return {valid: false, error: `campo '${field}' não é numérico`}
            }
        }

        const RepositoryManufacturer = await Repository.get(Repository.Manufacturer)
        const {man_cod} = await RepositoryManufacturer.findOne({
            where: {man_name: ILike(advertisement.marca)}, select: ["man_cod"]
        }) || {man_cod: "1"}

        advertisement.adv_man_cod = man_cod

        return {valid: true}
    }

}