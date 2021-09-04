const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "anuncio",
    tableName: "anuncio",
    columns: {
        anu_cod: {
            primary: true,
            type: "varchar",
            generated: true
        },
        anu_usu_cod: {
            type: "bigint"
        },
        anu_descricao_marca: {
            type: "varchar"
        },
        anu_nome_fabricante: {
            type: "varchar"
        },
        anu_descricao_modelo: {
            type: "varchar"
        },
        anu_valor: {
            type: "double precision"
        },
        anu_favoritos: {
            type: "integer"
        }
    },
    relations: {
        usuario: {
            type: "many-to-one",
            target: "usuario",
            joinColumn: {
                name: "anu_usu_cod",
                referencedColumnName: "usu_cod"
            }
        }
    }
})