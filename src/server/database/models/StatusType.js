const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "StatusType",
    tableName: "status_type",
    columns: {
        sty_cod: {
            primary: true,
            type: "bigint",
            generated: true
        },
        sty_description: {
            type: "varchar",
            nullable: false,
            unique: true
        }
    },
    relations: {
        Advertisement: {
            type: "one-to-one",
            target: "advertisement",
            joinColumn: {
                name: "sty_cod",
                referencedColumnName: "adv_sty_cod",
                inverseSide: "status_type"
            }
        }
    }
})