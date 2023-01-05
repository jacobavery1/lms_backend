var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _announcements = require("./announcements");
var _assignments = require("./assignments");
var _courses = require("./courses");
var _grades = require("./grades");
var _media = require("./media");
var _modules = require("./modules");
var _posts = require("./posts");
var _students = require("./students");
var _submissions = require("./submissions");
var _submitted_documents = require("./submitted_documents");
var _teachers = require("./teachers");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var announcements = _announcements(sequelize, DataTypes);
  var assignments = _assignments(sequelize, DataTypes);
  var courses = _courses(sequelize, DataTypes);
  var grades = _grades(sequelize, DataTypes);
  var media = _media(sequelize, DataTypes);
  var modules = _modules(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);
  var students = _students(sequelize, DataTypes);
  var submissions = _submissions(sequelize, DataTypes);
  var submitted_documents = _submitted_documents(sequelize, DataTypes);
  var teachers = _teachers(sequelize, DataTypes);

  submissions.belongsTo(assignments, { as: "assignment", foreignKey: "assignment_id"});
  assignments.hasMany(submissions, { as: "submissions", foreignKey: "assignment_id"});
  submitted_documents.belongsTo(assignments, { as: "assignment", foreignKey: "assignment_id"});
  assignments.hasMany(submitted_documents, { as: "submitted_documents", foreignKey: "assignment_id"});
  announcements.belongsTo(courses, { as: "course", foreignKey: "course_id"});
  courses.hasMany(announcements, { as: "announcements", foreignKey: "course_id"});
  assignments.belongsTo(courses, { as: "course", foreignKey: "course_id"});
  courses.hasMany(assignments, { as: "assignments", foreignKey: "course_id"});
  grades.belongsTo(courses, { as: "course", foreignKey: "course_id"});
  courses.hasMany(grades, { as: "grades", foreignKey: "course_id"});
  modules.belongsTo(courses, { as: "course", foreignKey: "course_id"});
  courses.hasMany(modules, { as: "modules", foreignKey: "course_id"});
  posts.belongsTo(courses, { as: "course", foreignKey: "course_id"});
  courses.hasMany(posts, { as: "posts", foreignKey: "course_id"});
  submissions.belongsTo(courses, { as: "course", foreignKey: "course_id"});
  courses.hasMany(submissions, { as: "submissions", foreignKey: "course_id"});
  submitted_documents.belongsTo(courses, { as: "course", foreignKey: "course_id"});
  courses.hasMany(submitted_documents, { as: "submitted_documents", foreignKey: "course_id"});
  assignments.belongsTo(modules, { as: "module", foreignKey: "module_id"});
  modules.hasMany(assignments, { as: "assignments", foreignKey: "module_id"});
  posts.belongsTo(modules, { as: "module", foreignKey: "module_id"});
  modules.hasMany(posts, { as: "posts", foreignKey: "module_id"});
  submissions.belongsTo(students, { as: "student_uu", foreignKey: "student_uuid"});
  students.hasMany(submissions, { as: "submissions", foreignKey: "student_uuid"});
  submitted_documents.belongsTo(students, { as: "student_uu", foreignKey: "student_uuid"});
  students.hasMany(submitted_documents, { as: "submitted_documents", foreignKey: "student_uuid"});
  announcements.belongsTo(teachers, { as: "sender", foreignKey: "sender_id"});
  teachers.hasMany(announcements, { as: "announcements", foreignKey: "sender_id"});

  return {
    admin,
    announcements,
    assignments,
    courses,
    grades,
    media,
    modules,
    posts,
    students,
    submissions,
    submitted_documents,
    teachers,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
