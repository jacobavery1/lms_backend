const auth = require('./authentication/auth')
const data = require('./data/index')
const db = require('../database/connection')

// handle a jwt expired error 
module.exports = {
    Query: {
        courses: async (parent, args, contextValue) => {
            return data.queryCourses.getCoursesByUser(contextValue)
        }, 
        course: async (parent, args, contextValue) => {
            return data.queryCourses.getCourseById(args, contextValue)
        }, 
        students: async (parent, args, contextValue) => {
            return data.queryUsers.getStudents(args, contextValue)
        }, 
        student: async (parent, args, contextValue) => {
            return data.queryUsers.getStudent(args, contextValue)
        }, 
        assignments: async (parent, args, contextValue) => {
            return data.queryCourses.getAssignmentsByCourse(args, contextValue)
        }, 
        assignment: async (parent, args, contextValue) => {
            return data.queryCourses.getAssignmentById(args, contextValue)
        }
    }, 
    Mutation: {
        login: async (parent, args, contextValue) => {
            return auth.login(args)
        }, 
        signup: async (parent, args, contextValue) => {
            return auth.signup(args)
        }

    }, 
    Course: {
        modules: async (parent, args, contextValue) => {
            return data.queryParent.getModulesFromParent(parent)
        }, 
        students: async (parent, args, contextVale) => {
            return data.queryParent.getStudentsFromParent(parent)
        }
    }
}