const db = require("../database/connection")

module.exports = async (role, userId) => {
    let dbName = ""
    switch (role) {
        case "admin":
            dbName = "admin"
            break 
        case "student":
            dbName = "students"
            break 
        case "teacher": 
            dbName = "teachers"
            break
    }

    let user = await db[dbName].findOne({
        where: {
            _id: userId
        }
    })
    return user.dataValues
}