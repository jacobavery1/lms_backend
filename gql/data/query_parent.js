const db = require('../../database/connection')
const utils = require('./utils')

module.exports = {
    getModulesFromParent: async (parent) => {
        const modules = await utils.getItemsByCourseId("modules", parent._id)
        return modules
    }, 

    getStudentsFromParent: async (parent) => {
        const [results] = await db.sequelize.query('SELECT * FROM students WHERE ? = any(courses)', 
                {replacements: [parent._id] }
        )
        return results
    }
}