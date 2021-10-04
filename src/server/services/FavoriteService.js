const {Not, MoreThan} = require("typeorm")
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
        const RepositoryAdvertisement = await Repository.get(Repository.Advertisement)
        const advertisementFavoritedCount = await RepositoryAdvertisement.count({
            adv_use_cod: user.use_cod,
            adv_favorites: MoreThan(0),
            adv_sty_cod: Not(2)
        })

        //  Se não tem nenhum, é 0%
        if (!advertisementFavoritedCount) {
            return "0,00%"
        }
        const allAdvertisementCount = await RepositoryAdvertisement.count({adv_use_cod: user.use_cod, adv_sty_cod: Not(2)})
        
        //  Se não tem nenhum, é 0%
        if (!allAdvertisementCount) {
            return "0,00%"
        }
        return `${(advertisementFavoritedCount * 100 / allAdvertisementCount).toFixed(2)}%`.replace(".", ",")
    },

    getAdminReport: async function() {
        const RepositoryAdvertisement = await Repository.get(Repository.Advertisement)
        const allAdvertisementFavoritedCount = await RepositoryAdvertisement.count({
            adv_favorites: MoreThan(0),
            adv_sty_cod: Not(2)
        })

        //  Se não tem nenhum, é 0%
        if (!allAdvertisementFavoritedCount) {
            return "0,00%"
        }
        const allAdvertisementCount = await RepositoryAdvertisement.count({adv_sty_cod: Not(2)})

        //  Se não tem nenhum, é 0%
        if (!allAdvertisementCount) {
            return "0,00%"
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