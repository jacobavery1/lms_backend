const Query = require('./Query')

class Users extends Query {
    async getStudents() {
        if (this.role == "admin") {
            return this.db.students.findAll()
        } else {
            let courses = this.user.courses
            

            let studentsInEnrolledCourses = []
            
            for (let i = 0; i < courses.length; i++) {
                const [results] = await this.db.sequelize.query('SELECT * FROM students WHERE ? = any(courses)', 
                    {replacements: [courses[i]] }
                )   
                results.forEach((result) => {
                    studentsInEnrolledCourses.push(result)
                })
            }

            return studentsInEnrolledCourses
        }
    }

    async getStudent(args) {
        const _id = args._id
        
        if (this.role == "admin") {
            return this.db.students.findOne({
                where: {
                    _id: _id 
                }
            })
        } else {
            let courses = this.user.courses 
            let student = await this.db.students.findOne({
                where: {
                    _id: _id
                }
            })

            let studentsInEnrolledCourses = []
            
            for (let i = 0; i < courses.length; i++) {
                const [results] = await this.db.sequelize.query('SELECT * FROM students WHERE ? = any(courses)', 
                    {replacements: [courses[i]] }
                )   
                results.forEach((result) => {
                    studentsInEnrolledCourses.push(result)
                })
            }

            let studentIds = []

            studentsInEnrolledCourses.forEach(s => {
                studentIds.push(s._id)
            })

            if (studentIds.includes(student.dataValues._id)) {
                return student
            } else {
                return null
            }
        }
    }
}

module.exports = Users