const db = require('../../database/connection')

module.exports = {
    getUserCourses: async (database, userId) => {
        const user = await db[database].findByPk(userId)
        const courseIds = user.dataValues.courses 
    
        return courseIds 
    },
    
    getItemsByCourseId: async (database, courseId) => {
        const items = db[database].findAll({
            where: {
                course_id: courseId
            }
        })
        return items 
    },
    
    getItemById: async (database, itemId) => {
        const item = await db[database].findByPk(itemId)
        return item 
    }
}