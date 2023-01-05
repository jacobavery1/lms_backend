const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../../database/connection')
const utils = require('./utils')
const data = require('../data/index')
require('dotenv').config()

module.exports = {
    login: async (args) => {
        const role = args.role
        
        let user = null 
        
        if (role == "student") {
            user = await utils.findUserByUsername("students", args.username)
        } else if (role == "teacher") {
            user = await utils.findUserByUsername("teachers", args.username)
        } else if (role == "admin") {
            user = await utils.findUserByUsername("admin", args.username)
        } else {
            return {
                message: "Invalid role."
            }
        }

        if (user?.length > 0) {
            const data = user[0].dataValues
            const role_password = `${role}_password`
            const passwordIsValid = bcrypt.compareSync(args.password, data[role_password])

            if (passwordIsValid) {
                let token = jwt.sign({
                    _id: data._id, 
                    role
                }, process.env.AUTH_KEY, {
                    expiresIn: 86400
                })

                return {
                    message: `${role} successfully accessed.`,
                    token,
                    ...data
                }
            } else {
                return {
                    message: "Invalid password."
                }
            }

        } else {
            return {
                message: "Invalid credentials."
            }
        }
    }, 
    signup: async (args) => {
        let database = null 
        const user_password = `${args.role}_password`
        switch (args.role) {
            case "admin": 
                database = "admin"
                break 
            case "student": 
                database = "students"
                break 
            case "teacher": 
                database = "teachers"
                break 
        }
        console.log(database)

        const userExists = await utils.checkUserExists(database, args.username)
        if (!userExists) {
            const newUser = await data.mutateUsers.createUser(database, user_password, args.role, {
                firstname: args.firstname, 
                lastname: args.lastname, 
                username: args.username, 
                password: args.password
            })
            
            return newUser
        } else {
            return {
                message: "User already exists"
            }
        }

    }
}