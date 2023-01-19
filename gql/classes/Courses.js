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

    async getAnnouncementsInCourse(parent) {
        const announcements = await this.getItemsFromParent("announcements", "course_id", parent._id)
        return announcements
    }

    async getSubmittedDocumentsFromAssignment(parent) {
        const documents = await this.getItemsFromParent("submitted_documents", "assignment_id", parent._id)
        return documents
    }

    async createCourse(args) {
        if (this.role == "admin" || this.role == "teacher") {
            let item = this.createItem("courses", args)
            return item
        }
    }

    async addStudentToCourse(args) {
        if (this.role == "admin" || this.role == "teacher") {
            const [course] = await this.db.sequelize.query('UPDATE students SET courses = array_append(courses, ?) WHERE _id = ? RETURNING *', {
                replacements: [args.course_id, args.student_id]
            })
            return course[0]
        }
    }

    async addTeacherToCourse(args) {
        if (this.role == "admin") {
            const [course] = await this.db.sequelize.query('UPDATE teachers SET courses = array_append(courses, ?) WHERE _id = ? RETURNING *', {
                replacements: [args.course_id, args.teacher_id]
            })
            return course[0]
        }
    }

    async createModule(args) {
        // automatically create order
       
        let [lastModule] = await this.db.sequelize.query('SELECT MAX(course_order) as order FROM modules WHERE course_id = ?', {
            replacements: [args.course_id]
        })
        
        let order = 0
        if (lastModule.length > 0) {
            order = lastModule[0].order
            order++
        }

        if (this.role == "admin" || this.role == "teacher") {
            let module = this.createItem("modules", {...args, course_order: order})
            return module
        }
    }

    async createPost(args) {
        // automatically create order
        let [lastPost] = await this.db.sequelize.query('SELECT MAX(module_order) as order FROM (SELECT module_order FROM posts WHERE module_id = ? UNION ALL SELECT module_order FROM assignments WHERE module_id = ?) as subQuery', {
            replacements: [args.module_id, args.module_id]
        })
        
        let order = 0
        if (lastPost.length > 0 && lastPost[0]?.order) {
            order = lastPost[0].order
            order++
        }

        if (this.role == "admin" || this.role == "teacher") {
            let post = this.createItem("posts", {...args, post_date: Date.now(), module_order: order })
            return post 
        }
    }

    async createAssignment(args) {
        // automatically create order
        let [lastAssignment] = await this.db.sequelize.query('SELECT MAX(module_order) as order FROM (SELECT module_order FROM posts WHERE module_id = ? UNION ALL SELECT module_order FROM assignments WHERE module_id = ?) as subQuery', {
            replacements: [args.module_id, args.module_id]
        })

        let order = 0
        if (lastAssignment.length > 0 && lastAssignment[0]?.order) {
            order = lastAssignment[0].order
            order++
        }

        if (this.role == "admin" || this.role == "teacher") {
            let assignment = this.createItem("assignments", {...args, module_order: order })
            return assignment
        }
    }



}

module.exports = Courses