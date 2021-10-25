module.exports = {
    
    equalBrand: function(filterBrand, value) {
        return value === filterBrand
    },

    equalModel: function(filterModel, value) {
        return value === filterModel
    },

    equalYearManMod: function(filterYearManModel, value) {

        return value.adv_year_manufacture + "-" + value.adv_year_model === filterYearManModel
    },

    rangeValue: function(valueMin, valueMax, value) {
        if (valueMin === valueMax) return valueMin === value
        return valueMin >= value <= valueMax
    },

    valueMin: function(valueMin, value) {
        return value >= valueMin
    },

    valueMax: function(valueMax, value) {
        return value <= valueMax
    }
}