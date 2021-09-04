const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
  name: "usuario",
  tableName: "usuario",
  columns: {
    usuCod: {
      name: "usu_cod",
      primary: true,
      type: "bigint",
      generated: true
    },
    usuNome: {
      name: "usu_nome",
      type: "varchar",
    },
    usuIsCpf: {
      name: "usu_is_cpf",
      type: "boolean",
    },
    usuDocumento: {
      name: "usu_documento",
      type: "varchar",
    },
    usuApelido: {
      name: "usu_apelido",
      type: "varchar",
    },
    usuEndereco: {
      name: "usu_endereco",
      type: "varchar",
    },
    usuEmail: {
      name: "usu_email",
      type: "varchar",
    },
    usuSenha: {
      name: "usu_senha",
      type: "varchar",
    },
    usuIsTemp: {
      name: "usu_is_temp",
      type: "boolean",
    }
  },
  relations: {
    anuncio: {
      type: "one-to-many",
      target: "anuncio"
    },
    criptografia:{
      type: "one-to-one",
      target: "criptografia"
    }
  }
})