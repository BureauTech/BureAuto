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
            type: "varchar",
            nullable: false
        },
        use_is_cpf_document: {
            type: "boolean",
            nullable: false
        },
        use_document: {
            type: "varchar",
            nullable: false
        },
        use_nickname: {
            type: "varchar"
        },
        use_phone: {
            type: "varchar",
            nullable: false
        },
        use_address: {
            type: "varchar",
            nullable: false
        },
        use_email: {
            type: "varchar",
            nullable: false
        },
        use_is_temp_password: {
            type: "boolean",
            nullable: false,
            default: true
        },
        use_password: {
            type: "varchar",
            nullable: false
        },
        use_is_admin: {
            type: "boolean",
            nullable: false,
            default: false
        },
        use_created_at: {
            type: "timestamp with time zone",
            nullable: false,
            default: "current_timestamp"
        }
    },
    relations: {
        Advertisement: {
            type: "one-to-many",
            target: "advertisement",
            joinColumn: {
                name: "use_cod",
                referencedColumnName: "adv_use_cod"
            }
        },
        Cryptography: {
            type: "one-to-one",
            target: "cryptography",
            joinColumn: {
                name: "use_cod",
                referencedColumnName: "cry_use_cod",
                inverseSide: "user"
            }
        },
        Favorite: {
            type: "one-to-many",
            target: "favorite",
            joinColumn: {
                name: "use_cod",
                referencedColumnName: "fav_use_cod"
            }
        },
        Chat: {
            type: "one-to-one",
            target: "chat",
            joinColumn: {
                name: "use_cod",
                referencedColumnName: "cha_use_cod",
                inverseSide: "user"
            }
        },
        Message: {
            type: "one-to-one",
            target: "message",
            joinColumn: {
                name: "use_cod",
                referencedColumnName: "mes_use_cod",
                inverseSide: "user"
            }
        }
    }
})