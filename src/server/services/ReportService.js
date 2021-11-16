const FavoriteService = require("../services/FavoriteService")
const AdvertisementService = require("../services/AdvertisementService")

module.exports = {

    getAllReports: async function(user) {
        return {
            favorites: await FavoriteService.getAdvertiserReport(user),
            adsReport: await AdvertisementService.getReportViewContact(user.use_cod),
            adsSold: await AdvertisementService.getSoldAdvertisementsReport(user.use_cod),
            adsSoldByCategory: await AdvertisementService.getSoldByCategoryReport(user.use_cod),
            adsTimeReport: await AdvertisementService.getTimeReport(user.use_cod)
        }
    }

}