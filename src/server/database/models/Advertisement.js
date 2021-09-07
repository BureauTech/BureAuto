const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Advertisement",
    tableName: "advertisement",
    columns: {
        adv_cod: {
            primary: true,
            type: "bigint",
            generated: true
        },
        adv_use_cod: {
            type: "bigint"
        },
        adv_man_cod: {
            type: "bigint"
        },
        adv_brand_description: {
            type: "varchar"
        },
        adv_model_description: {
            type: "varchar"
        },
        adv_value: {
            type: "double precision"
        },
        adv_favorites: {
            type: "integer"
        },
        adv_views: {
            type: "integer"
        },
        adv_year_model: {
            type: "integer"
        },
        adv_year_manufacture: {
            type: "integer"
        },
        adv_images: {
            type: "bytea",
            array: true
        },
        adv_status: {
            type: "varchar"
        }
    },
    relations: {
        User: {
            type: "many-to-one",
            target: "user",
            joinColumn: {
                name: "adv_use_cod",
                referencedColumnName: "use_cod"
            }
        }
    }
})