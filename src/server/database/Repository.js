const Entities = require("./Entities")
const Connection = require("./Connection")

const repository = Entities
Object.keys(repository).map(entity => repository[entity] = entity)

repository.get = async(entityName) => {
    const connection = await Connection
    return await connection.getRepository(entityName)
}

module.exports = repository