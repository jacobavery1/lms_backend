const db = require('../../database/connection')

module.exports.checkUserExists = async (database, username) => {
        const user = await this.findUserByUsername(database, username)

        if (user.length == 0)
            return false 
        else return true 
}

module.exports.findUserByUsername = async (database, username) => {
        const user = await db[database].findAll({
            where: {
                username: username
            }
        })
        return user
}
