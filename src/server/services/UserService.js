const Papa = require("papaparse")

module.exports = {

    registerUser: function(file) {
        Papa.parse(file, {
            header: true,
            delimiter: ";",
            transformHeader: header => header.trim(),
            complete: function(results) {
                console.log(results.data)
            }
        })
    }

}