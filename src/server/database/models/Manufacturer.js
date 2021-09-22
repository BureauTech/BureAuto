const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Manufacturer",
    tableName: "manufacturer",
    columns: {
        man_cod: {
            primary: true,
            type: "bigint",
            generated: true
        },
        man_name: {
            type: "varchar",
            unique: true,
            nullable: false
        }
    },
    relations: {
        Advertisement: {
            type: "one-to-many",
            target: "advertisement",
            joinColumn: {
                name: "man_cod",
                referencedColumnName: "adv_man_cod"
            }
        }
    }
})