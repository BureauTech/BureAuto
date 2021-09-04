const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "criptografia",
    tableName: "criptografia",
    columns: {
        criUsuCod: {
            name: "cri_usu_cod",
            primary: true,
            type: "bigint",
            generated: true
        },
        criChave: {
            name: "cri_chave",
            type: "varchar"
        }
    }
    // relations: {
    //   usuario: {
    //     type: "one-to-one",
    //     target: "usuario",
    //     joinColumn: {
    //       name: "usu_cod",
    //       referencedColumnName: "usuCod"
    //     }
    //   }
    // }
})