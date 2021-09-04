const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "criptografia",
    tableName: "criptografia",
    columns: {
        cri_usu_cod: {
            primary: true,
            type: "bigint",
            generated: true
        },
        cri_chave: {
            type: "varchar"
        }
    },
    relations: {
        usuario: {
            type: "one-to-one",
            target: "usuario",
            joinColumn: {
                name: "cri_usu_cod",
                referencedColumnName: "usu_cod"
            }
        }
    }
})