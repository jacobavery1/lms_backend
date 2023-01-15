const Query = require("./Query")

class Courses extends Query {
    async getCourses() {
        if (this.role == "admin") {
            const data = await this.db.courses.findAll()
            return data 
        } else {
            let returnItems = []

            for (let i = 0; i < this.user.courses.length; i++) {
                const item = await this.db.courses.findByPk(this.user.courses[i])
                returnItems.push(item.dataValues)
            }

            return returnItems
        }
    }

    async getCourse(args) {
        const course = await this.getItemIfUserInCourse("courses", args._id, "_id")
        return course
    }

    async getAssignmentsInCourse(parent) {
        const assignments = await this.getItemsByCourseId("assignments", parent._id)
        return assignments
    }

    async getStudentsInCourse(parent) {
        const [results] = await this.db.sequelize.query('SELECT * FROM students WHERE ? = any(courses)', 
                {replacements: [parent._id] }
        )
        return results
    }

    async getModulesInCourse(parent) {
        const modules = await this.getItemsByCourseId("modules", parent._id)
        return modules
    }

    async getSubmissionsInAssignment(parent) {
        const submissions = await this.getItemsFromParent("submissions", "assignment_id", parent._id)
        return submissions
    }

    async getAssignmentsInModule(parent) {
        const assignments = await this.getItemsFromParent("assignments", "module_id", parent._id)
        return assignments
    }

    async getPostsInModule(parent) {
        const posts = await this.getItemsFromParent("posts", "module_id", parent._id)
        return posts
    }
}

module.exports = Courses