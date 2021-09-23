const Repository = require("../database/Repository")

module.exports = {

    getAllUserFavorites: async function(use_cod) {
        const RepositoryFavorite = await Repository.get(Repository.Favorite)
        return await RepositoryFavorite.find({where: {fav_use_cod: use_cod}})
    },

    getFavorite: async function(use_cod, adv_cod) {
        const RepositoryFavorite = await Repository.get(Repository.Favorite)
        return await RepositoryFavorite.findOne({where: {fav_use_cod: use_cod, fav_adv_cod: adv_cod}})
    },

    registerFavorite: async function(use_cod, adv_cod) {
        const RepositoryFavorite = await Repository.get(Repository.Favorite)
        const favoriteExists = await RepositoryFavorite.findOne({where: {fav_use_cod: use_cod, fav_adv_cod: adv_cod}})

        if (favoriteExists) return favoriteExists

        return await RepositoryFavorite.save({
            fav_use_cod: use_cod,
            fav_adv_cod: adv_cod
        })
    },

    deleteFavorite: async function(fav_cod) {
        const RepositoryFavorite = await Repository.get(Repository.Favorite)
        return await RepositoryFavorite.delete(fav_cod)
    }
}