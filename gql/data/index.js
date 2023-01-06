const queryCourses = require('./query_courses')
const queryUsers = require('./query_users')
const queryParent = require('./query_parent')
const mutateUsers = require('./mutate_users')

module.exports = {
    queryCourses, 
    queryUsers,
    queryParent, 
    mutateUsers
}