const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Chat",
    tableName: "chat",
    uniques: [{
        name: "chat_cha_use_cod_cha_adv_cod_ukey",
        columns: ["cha_use_cod", "cha_adv_cod"]
    }],
    columns: {
        cha_cod: {
            primary: true,
            type: "bigint",
            generated: true
        },
        cha_use_cod: {
            type: "bigint",
            nullable: false
        },
        cha_adv_cod: {
            type: "bigint",
            nullable: false
        },
        cha_created_at: {
            type: "timestamp with time zone",
            nullable: false,
            default: "current_timestamp"
        }
    },
    relations: {
        User: {
            type: "one-to-one",
            target: "user",
            joinColumn: {
                name: "cha_use_cod",
                referencedColumnName: "use_cod"
            }
        },
        Advertisement: {
            type: "one-to-one",
            target: "advertisement",
            joinColumn: {
                name: "cha_adv_cod",
                referencedColumnName: "adv_cod"
            }
        },
        Message: {
            type: "one-to-one",
            target: "message",
            joinColumn: {
                name: "cha_cod",
                referencedColumnName: "mes_cha_cod",
                inverseSide: "chat"
            }
        } 
    }
})