const db = require('../../database/connection')
const bcrypt = require('bcryptjs')

module.exports = {
    createUser: async (database, user_password, role, {
        firstname, 
        lastname, 
        username, 
        password
    }) => {
        const newUser = await db[database].create({
            firstname: firstname, 
            lastname: lastname, 
            username: username, 
            [user_password]: bcrypt.hashSync(password, 8)
        }) 

        return {
            message: `New ${role} created.`, 
            token: null, 
            ...newUser.dataValues
        }
    }
    // update user 
}