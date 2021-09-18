const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Cryptography",
    tableName: "cryptography",
    columns: {
        cry_use_cod: {
            primary: true,
            type: "bigint",
            generated: true
        },
        cry_key: {
            type: "varchar"
        }
    },
    relations: {
        User: {
            type: "one-to-one",
            target: "user",
            joinColumn: {
                name: "cry_use_cod",
                referencedColumnName: "use_cod"
            }
        }
    }
})