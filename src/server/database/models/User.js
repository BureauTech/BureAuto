const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "User",
    tableName: "user",
    columns: {
        use_cod: {
            primary: true,
            type: "bigint",
            generated: true
        },
        use_name: {
            type: "varchar"
        },
        use_is_cpf_document: {
            type: "boolean"
        },
        use_document: {
            type: "varchar"
        },
        use_username: {
            type: "varchar"
        },
        use_phone: {
            type: "varchar"
        },
        use_address: {
            type: "varchar"
        },
        use_email: {
            type: "varchar"
        },
        use_is_temp_password: {
            type: "boolean"
        },
        use_password: {
            type: "varchar"
        }
    },
    relations: {
        Advertisement: {
            type: "one-to-many",
            target: "advertisement",
            joinColumn: {
                name: "use_cod",
                referencedColumnName: "anu_use_cod"
                
            },
            inverseSide: "User"
        },
        Cryptography: {
            type: "one-to-one",
            target: "cryptography",
            joinColumn: {
                name: "use_cod",
                referencedColumnName: "cry_use_cod",
                inverseSide: "user"
            }
        }
    }
})