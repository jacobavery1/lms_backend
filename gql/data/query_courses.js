const db = require('../../database/connection')
const auth = require('../authentication/auth')
const utils = require('./utils')

module.exports = {
    getCoursesByUser: async (contextValue) => {
        const ROLE = contextValue.role 

        if (ROLE == "admin") {
            const data = await db.courses.findAll()
            return data
        } else if (ROLE == "student" || ROLE == "teacher") {
            // returns courses user is enrolled in 
            const database = ROLE == "student" ? "students" : "teachers"

            const courses = await utils.getUserCourses(database, contextValue._id)

            let returnItems = []

            for (course of courses) {
                const item = db.courses.findByPk(course)
                returnItems.push(item)
            }

            return returnItems
        }
    }, 

    getCourseById: async (args, contextValue) => {
        const ROLE = contextValue.role 
        if (ROLE == "admin") {
            const data = await db.courses.findByPk(args._id)
            return data 
        } else {
            const database = ROLE == "student" ? "students" : "teachers"
            const courses = await utils.getUserCourses(database, contextValue._id)

            if (courses?.includes(args._id)) {
                const data = await db.courses.findByPk(args._id)
                return data
            } else {
                return null
            }
        }
    }, 

    getAssignmentsByCourse: async (args, contextVale) => {
        const ROLE = contextVale.role 
        if (ROLE == "admin") {
            return utils.getItemsByCourseId("assignments", args.course_id)
        } else {
            const database = ROLE == "student" ? "students" : "teachers"
            const courses = await utils.getUserCourses(database, contextVale._id)

            if (courses?.includes(args.course_id)) {
                return utils.getItemsByCourseId("assignments", args.course_id)
            } else return null
        }
    }, 

    getAssignmentById: async (args, contextVale) => {
        const ROLE = contextVale.role 
        const assignment = await utils.getItemById("assignments", args.assignment_id)
        if (ROLE == "admin") {
            return assignment
        } else {
            const database = ROLE == "student" ? "students" : "teachers"
            const courses = await utils.getUserCourses(database, contextVale._id)

            if (courses?.includes(assignment.dataValues.course_id)) {
                return assignment
            } else return null
        }
    }
    
}


