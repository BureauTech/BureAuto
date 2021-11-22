const Repository = require("../database/Repository")

module.exports = {

    getAllManufacturer: async function() {
        const RepositoryManufacturer = await Repository.get(Repository.Manufacturer)
        return await RepositoryManufacturer.find()
    }
}