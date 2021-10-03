const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Favorite",
    tableName: "favorite",
    columns: {
        fav_use_cod: {
            type: "bigint",
            nullable: false,
            primary: true
        },
        fav_adv_cod: {
            type: "bigint",
            nullable: false,
            primary: true
        },
        fav_created_at: {
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
                name: "fav_use_cod",
                referencedColumnName: "use_cod"
            }
        },
        Advertisement: {
            type: "many-to-one",
            target: "advertisement",
            joinColumn: {
                name: "fav_adv_cod",
                referencedColumnName: "adv_cod"
            }
        }
    }
})