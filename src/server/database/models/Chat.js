const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Chat",
    tableName: "chat",
    columns: {
        cha_cod: {
            primary: true,
            type: "bigint",
            generated: true
        },
        cha_use_cod: {
            type: "bigint",
            unique: true,
            nullable: false
        },
        cha_adv_cod: {
            type: "bigint",
            unique: true,
            nullable: false
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
            target: "user",
            joinColumn: {
                name: "cha_adv_cod",
                referencedColumnName: "adv_cod"
            }
        }  
    }
})