const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Favorite",
    tableName: "favorite",
    columns: {
        fav_cod: {
            primary: true,
            type: "bigint",
            generated: true
        },
        fav_use_cod: {
            type: "bigint",
            unique: true,
            nullable: false
        },
        fav_adv_cod: {
            type: "bigint",
            unique: true,
            nullable: false
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