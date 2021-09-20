const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Message",
    tableName: "message",
    columns: {
        mes_cod: {
            primary: true,
            type: "bigint",
            generated: true
        },
        mes_use_cod: {
            type: "bigint",
            unique: true,
            nullable: false
        },
        mes_cha_cod: {
            type: "bigint",
            unique: true,
            nullable: false
        },
        mes_text: {
            type: "varchar",
            unique: true,
            nullable: false
        }
    },
    relations: {
        User: {
            type: "one-to-one",
            target: "user",
            joinColumn: {
                name: "mes_use_cod",
                referencedColumnName: "use_cod"
            }
        },
        Chat: {
            type: "one-to-one",
            target: "user",
            joinColumn: {
                name: "mes_cha_cod",
                referencedColumnName: "cha_cod"
            }
        }  
    }
})