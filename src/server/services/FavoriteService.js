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
    },

    getAdvertiserReport: async function(adv_use_cod) {
        const RepositoryFavorite = await Repository.get(Repository.Favorite)
        const allAdvertisementFavorited = await RepositoryFavorite.createQueryBuilder("favorite")
            .distinctOn(["favorite.fav_adv_cod"])
            .leftJoin("advertisement", "advertisement", "favorite.fav_adv_cod = advertisement.adv_cod")
            .where("advertisement.adv_use_cod = :adv_use_cod", {adv_use_cod: adv_use_cod})
            .getMany()
        const advertisementFavoritedCount = allAdvertisementFavorited.length
        
        //  Se não tem nenhum, é 0%
        if (!advertisementFavoritedCount) {
            return 0
        }
        
        const RepositoryAdvertisement = await Repository.get(Repository.Advertisement)
        const allAdvertisementCount = await RepositoryAdvertisement.count({adv_use_cod: adv_use_cod})
        
        //  Se não tem nenhum, é 0%
        if (!allAdvertisementCount) {
            return 0
        }

        return advertisementFavoritedCount / allAdvertisementCount
    }
}