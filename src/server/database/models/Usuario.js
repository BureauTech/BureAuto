const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "usuario",
    tableName: "usuario",
    columns: {
        usu_cod: {
            primary: true,
            type: "bigint",
            generated: true
        },
        usu_nome: {
            type: "varchar"
        },
        usu_is_cpf: {
            type: "boolean"
        },
        usu_documento: {
            type: "varchar"
        },
        usu_apelido: {
            type: "varchar"
        },
        usu_endereco: {
            type: "varchar"
        },
        usu_email: {
            type: "varchar"
        },
        usu_senha: {
            type: "varchar"
        },
        usu_is_temp: {
            type: "boolean"
        }
    },
    relations: {
        anuncio: {
            type: "one-to-many",
            target: "anuncio",
            joinColumn: {
                name: "usu_cod",
                referencedColumnName: "anu_usu_cod"
            }
        },
        criptografia: {
            type: "one-to-one",
            target: "criptografia",
            joinColumn: {
                name: "usu_cod",
                referencedColumnName: "cri_usu_cod"
            }
        }
    }
})