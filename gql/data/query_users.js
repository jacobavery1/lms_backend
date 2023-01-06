const db = require('../../database/connection')

module.exports = {
    getStudents: async (args, contextValue) => {
        const ROLE = contextValue.role 
        if (ROLE == "admin") {
            const students = await db.students.findAll()
            return students
        } else {
            return null
        }
    }, 
    getStudent: async (args, contextValue) => {
        const student = await db.students.findByPk(args._id)
        return student
    }
}