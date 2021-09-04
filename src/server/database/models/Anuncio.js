const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "anuncio",
    tableName: "anuncio",
    columns: {
        anuCod: {
            name: "anu_cod",
            primary: true,
            type: "varchar",
            generated: true
        },
        anuUsuCod: {
            name: "anu_usu_cod",
            type: "bigint",
        },
        anuDescricaoMarca: {
            name: "anu_descricao_marca",
            type: "varchar"
        },
        anuNomeFabricante: {
            name: "anu_nome_fabricante",
            type: "varchar"
        },
        anuDescricaoModelo: {
            name: "anu_descricao_modelo",
            type: "varchar"
        },
        anuValor: {
            name: "anu_valor",
            type: "double precision"
        },
        anuFavoritos: {
            name: "anu_favoritos",
            type: "integer"
        }
    },
    relations: {
        usuario: {
            type: "many-to-one",
            target: "usuario"
        }
    }
})