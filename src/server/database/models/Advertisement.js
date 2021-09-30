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
            type: "bigint",
            nullable: false
        },
        adv_man_cod: {
            type: "bigint",
            nullable: false
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
            type: "integer",
            default: 0,
            nullable: false
        },
        adv_views: {
            type: "integer",
            default: 0,
            nullable: false
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
        adv_sty_cod: {
            type: "bigint",
            nullable: false
        },
        adv_created_at: {
            type: "timestamp with time zone",
            nullable: false,
            default: "current_timestamp"
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
        },
        Manufacturer: {
            type: "many-to-one",
            target: "manufacturer",
            joinColumn: {
                name: "adv_man_cod",
                referencedColumnName: "man_cod"
            }
        },
        Favorite: {
            type: "one-to-many",
            target: "favorite",
            joinColumn: {
                name: "adv_cod",
                referencedColumnName: "fav_adv_cod"
            }
        },
        StatusType: {
            type: "one-to-one",
            target: "status_type",
            joinColumn: {
                name: "adv_sty_cod",
                referencedColumnName: "sty_cod"
            }
        },
        Chat: {
            type: "one-to-one",
            target: "chat",
            joinColumn: {
                name: "adv_cod",
                referencedColumnName: "cha_adv_cod",
                inverseSide: "advertisement"
            }
        }
    }
})