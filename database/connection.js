const { Sequelize, DataTypes } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
    logging: false
})

module.exports = {
    admin: require('./admin')(sequelize, DataTypes), 
    announcements: require('./announcements')(sequelize, DataTypes), 
    assignments: require('./assignments')(sequelize, DataTypes), 
    courses: require('./courses')(sequelize, DataTypes), 
    grades: require('./grades')(sequelize, DataTypes), 
    media: require('./media')(sequelize, DataTypes), 
    modules: require('./modules')(sequelize, DataTypes), 
    posts: require('./posts')(sequelize, DataTypes), 
    students: require('./students')(sequelize, DataTypes), 
    submissions: require('./students')(sequelize, DataTypes), 
    submitted_documents: require('./submitted_documents')(sequelize, DataTypes), 
    teachers: require('./teachers')(sequelize, DataTypes), 
    sequelize: sequelize
}