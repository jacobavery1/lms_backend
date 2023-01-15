module.exports = {
    Query: {
        courses: async (parent, args, contextValue) => {
            return contextValue.courses.getCourses()
        }, 
        course: async (parent, args, contextValue) => {
            return contextValue.courses.getCourse(args)
        }, 
        students: async (parent, args, contextValue) => {
            return contextValue.users.getStudents()
        }, 
        student: async (parent, args, contextValue) => {
            return contextValue.users.getStudent(args)
        }, 
        teachers: async () => {

        }, 
        teacher: async () => {

        }
    }, 
    Mutation: {
        login: async (parent, args, contextValue) => {
            return contextValue.auth.login(args)
        }, 
        signup: async (parent, args, contextValue) => {
            return contextValue.auth.signup(args)
        }

    }, 
    Course: {
        modules: async (parent, args, contextValue) => {
            return contextValue.courses.getModulesInCourse(parent)
        }, 
        students: async (parent, args, contextValue) => {
            return contextValue.courses.getStudentsInCourse(parent)
        }, 
        assignments: async (parent, args, contextValue) => {
            return contextValue.courses.getAssignmentsInCourse(parent)
        }
    }, 
    Assignment: {
        submissions: async (parent, args, contextValue) => {
            return contextValue.courses.getSubmissionsInAssignment(parent)
        }
    }, 
    Module: {
        posts: async (parent, args, contextValue) => {
            return contextValue.courses.getPostsInModule(parent) 
        }, 
        assignments: async (parent, args, contextValue) => {
            return contextValue.courses.getAssignmentsInModule(parent)
        }
    }
}