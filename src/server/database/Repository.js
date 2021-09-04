const Connection = require("./Connection")
const Entities = require("./Entities")

let repository = Entities
Object.keys(repository).map(entity => repository[entity] = entity)

repository.get = async (entityName) => {
  return await (await Connection).getRepository(entityName)
}

module.exports = repository