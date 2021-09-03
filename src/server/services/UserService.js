const Papa = require("papaparse")

/* eslint-disable-next-line no-unused-vars */
const UserService = module.exports = {

    registerUser: function(file) {
        Papa.parse(file, {
            header: true,
            delimiter: ";",
            transformHeader: header => header.trim(),
            complete: function(results, file) {
                console.log(results.data)
            }
        })
    }

}