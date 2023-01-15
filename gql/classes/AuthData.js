
const auth = require("../authentication/auth")

const Courses = require('./Courses')
const Users = require('./Users')

class AuthData {

    constructor(user, role) {
        this.user = user
        this.role = role
        this.auth = auth
        this.courses = new Courses(this.user, this.role)
        this.users = new Users(this.user, this.role)
    }

    

}

module.exports = AuthData