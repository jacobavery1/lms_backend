module.exports = `
    type Query {
        courses: [Course]
        course(_id: ID!): Course

        students: [Student]
        student(_id: ID!): Student

        teachers: [Teacher]
        teacher(_id: ID!): Teacher

        # admins 
        # admin

        # announcement 
        # assignment 
        # grade 
        # module 
        # post 
        # submission 
        # submitted document 
    }
    type Mutation {
        login(username: String!, password: String!, role: String!): AuthPayload
        
        signup(firstname: String!, lastname: String!, username: String!, password: String!, role: String!): AuthPayload

        # set/delete course 

        # set/delete module  

        # set/delete post 

        # set/delete assingment 

        # set/delete media 

        # set/delete student 
        # add courses to studet 

        # set/delete teacher 
        # add courses to teacher 

        # setadmin
    }
    type AuthPayload {
        message: String
        token: String
        _id: ID
        firstname: String 
        lastname: String 
        username: String
    }
    type Course {
        _id: ID!
        course_name: String 
        course_home_html: String
        students: [Student]
        modules: [Module]
        assignments: [Assignment]
        # announcements 
    }
    type Student {
        _id: ID!
        student_id: ID
        firstname: String
        lastname: String 
        username: String 
        courses: [String]
    }
    type Teacher {
        _id: ID!
        firstname: String 
        lastname: String
        usersname: String 
        courses: [String]
    }
    type Module {
        _id: ID!
        course_id: ID 
        course_order: Int 
        module_name: String 
        dispaly: Boolean
        posts: [Post]
        assignments: [Assignment]
    }
    type Post {
        _id: ID!
        course_id: ID 
        module_id: ID 
        display: Boolean
        module_order: Int
        post_name: String 
        post_date: String 
        post_description_html: String
    }
    type Assignment {
        _id: ID!
        course_id: ID
        module_id: ID
        display: Boolean 
        module_order: Int
        assignment_name: String 
        assigned_date: String 
        due_date: String
        assignment_description_html: String
        submissions: [Submission] 
        # submitted documents 
    }
    type Submission {
        _id: ID!
        course_id: ID
        assignment_id: ID
        student_uuid: ID 
        submission_date: String 
        submission_text_html: String
    }
    type SubmittedDocument {
        _id: ID!
        course_id: ID
        assignment_id: ID
        student_uuid: ID 
        submission_date: String 
        document_name: String 
        document_link: String 
    }
    type Media {
        _id: ID!
        media_title: String 
        media_date: String 
        media_url: String
    }
    type Announcement {
        _id: ID!
        course_id: ID
        sender_id: ID 
        announcement_date: String 
        announcement_title: String 
        announcement_text_html: String 
    }
`