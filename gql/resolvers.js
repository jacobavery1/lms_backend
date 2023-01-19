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
        teachers: async (parent, args, contextValue) => {
            return contextValue.users.getTeachers()
        }, 
        teacher: async (parent, args, contextValue) => {
            return contextValue.users.getTeacher(args)
        }
    }, 
    Mutation: {
        login: async (parent, args, contextValue) => {
            return contextValue.auth.login(args)
        }, 
        signup: async (parent, args, contextValue) => {
            return contextValue.auth.signup(args)
        }, 

        createCourse: async (parent, args, contextValue) => {
            return contextValue.courses.createCourse(args)
        }, 
        addStudentToCourse: async (parent, args, contextValue) => {
            return contextValue.courses.addStudentToCourse(args)
        }, 
        addTeacherToCourse: async (parent, args, contextValue) => {
            return contextValue.courses.addTeacherToCourse(args)
        }, 
        removeStudentFromCourse: async (parent, args, contextValue) => {

        }, 
        removeTeacherFromCourse: async (parent, args, contextValue) => {

        }, 

        createModule: async (parent, args, contextValue) => {
            return contextValue.courses.createModule(args)
        }, 
        createPost: async (parent, args, contextValue) => {
            return contextValue.courses.createPost(args)
        }, 
        createAssignment: async (parent, args, contextValue) => {
            return contextValue.courses.createAssignment(args)
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
        }, 
        announcements: async (parent, args, contextValue) => {
            return contextValue.courses.getAnnouncementsInCourse(parent)
        }
    }, 
    Assignment: {
        submissions: async (parent, args, contextValue) => {
            return contextValue.courses.getSubmissionsInAssignment(parent)
        }, 
        submitted_documents: async (parent, args, contextValue) => {
            return contextValue.courses.getSubmittedDocumentsFromAssignment(parent)
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