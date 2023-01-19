const db = require("../../database/connection")

class Query {
    constructor(user, role) {
        this.user = user 
        this.role = role
        this.db = db
    }

    async getItemsByCourseId(dbName, courseId) {
        const items = this.db[dbName].findAll({
            where: {
                course_id: courseId
            }
        })
        return items
    }

    async getItemsByUserCourse(dbName, courseId) {
        const items = await this.db[dbName].findAll({
            where: {
                course_id: courseId
            }
        })
        if (this.role == "admin") {
            return items
        } else {
            if (this.userHasCourse(courseId)) {
                return items
            } else {
                return null
            }
        }
    }

    async getItemIfUserInCourse(dbName, itemId, idName="course_id") {
        const item = await this.db[dbName].findByPk(itemId)
        const courseId = item.dataValues[idName]

        if (this.role == "admin") {
            return item.dataValues
        } else {
            if (this.userHasCourse(courseId)) {
                return item.dataValues
            } 
            return null 
        }
    }

    async getItemsFromParent(dbName, parentIdName, parentId) {
        const [items] = await this.db.sequelize.query(`SELECT * FROM ${dbName} WHERE ${parentIdName} = ?`, {
            replacements: [parentId]
        })

        return items
    }

    async createItem(dbName, attributes) {
        const item = this.db[dbName].create(attributes)
        return item
    }

    userHasCourse(courseId) {
        return this.user.courses?.includes(courseId)
    }

    getDbName() {
        switch (this.role) {
            case "admin": 
                return "admin"
            case "student": 
                return "students" 
            case "teacher": 
                return "teachers"
        }
    }
}

module.exports = Query