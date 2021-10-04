const {Not} = require("typeorm")
const Repository = require("../database/Repository")

module.exports = {

    getAllUserFavorites: async function(use_cod) {
        const RepositoryFavorite = await Repository.get(Repository.Favorite)
        return await RepositoryFavorite.find({where: {fav_use_cod: use_cod}})
    },

    getFavorite: async function(user, adv_cod) {
        const RepositoryFavorite = await Repository.get(Repository.Favorite)
        return await RepositoryFavorite.findOne({where: {fav_use_cod: user.use_cod, fav_adv_cod: adv_cod}})
    },

    registerFavorite: async function(user, adv_cod) {
        const RepositoryFavorite = await Repository.get(Repository.Favorite)
        const favoriteExists = await RepositoryFavorite.findOne({where: {fav_use_cod: user.use_cod, fav_adv_cod: adv_cod}})

        if (favoriteExists) return favoriteExists

        return await RepositoryFavorite.save({
            fav_use_cod: user.use_cod,
            fav_adv_cod: adv_cod
        })
    },

    deleteFavorite: async function(fav_adv_cod, user) {
        const RepositoryFavorite = await Repository.get(Repository.Favorite)
        return await RepositoryFavorite.delete({fav_adv_cod: fav_adv_cod, fav_use_cod: user.use_cod})
    },

    getAdvertiserReport: async function(user) {
        const RepositoryFavorite = await Repository.get(Repository.Favorite)
        const advertisementFavoritedCount = (await RepositoryFavorite.createQueryBuilder("favorite")
            .distinctOn(["favorite.fav_adv_cod"])
            .leftJoin("advertisement", "advertisement", "favorite.fav_adv_cod = advertisement.adv_cod")
            .where("advertisement.adv_use_cod = :adv_use_cod", {adv_use_cod: user.use_cod})
            .andWhere("advertisement.adv_sty_cod != :status", {status: 2})
            .getMany()).length
        //  Se não tem nenhum, é 0%
        if (!advertisementFavoritedCount) {
            return "0%"
        }

        const RepositoryAdvertisement = await Repository.get(Repository.Advertisement)
        const allAdvertisementCount = await RepositoryAdvertisement.count({adv_use_cod: user.use_cod, adv_sty_cod: Not(2)})
        
        //  Se não tem nenhum, é 0%
        if (!allAdvertisementCount) {
            return "0%"
        }
        
        return `${(advertisementFavoritedCount * 100 / allAdvertisementCount).toFixed(0)}%`
    },

    getAdminReport: async function() {
        const RepositoryFavorite = await Repository.get(Repository.Favorite)
        // distinctOn(["favorite.fav_adv_cod"]) -> Remove anúncios duplicados na query
        const allAdvertisementFavoritedCount = (await RepositoryFavorite.createQueryBuilder("favorite")
            .distinctOn(["favorite.fav_adv_cod"])
            .leftJoin("advertisement", "advertisement", "favorite.fav_adv_cod = advertisement.adv_cod")
            .getMany()).length

        //  Se não tem nenhum, é 0%
        if (!allAdvertisementFavoritedCount) {
            return "0%"
        }

        const RepositoryAdvertisement = await Repository.get(Repository.Advertisement)
        const allAdvertisementCount = await RepositoryAdvertisement.count()

        //  Se não tem nenhum, é 0%
        if (!allAdvertisementCount) {
            return "0%"
        }

        return `${(allAdvertisementFavoritedCount * 100 / allAdvertisementCount).toFixed(0) }%`
    },

    getAllFavorites: async function() {
        const RepositoryAdvertisement = await Repository.get(Repository.Advertisement)

        const allFavorites = (await RepositoryAdvertisement.createQueryBuilder("advertisement")
            .innerJoin("favorite", "favorite", "favorite.fav_adv_cod = advertisement.adv_cod")
            .getMany())

        //  Se não tem nenhum, é 0%
        if (!allFavorites) {
            return "0%"
        }

        return allFavorites
    }
    
}