const joi = require('joi');

module.exports.courseSchema = joi.object({
    course: joi.object({
        title: joi.string().required(),
        link: joi.string().required(),
        description: joi.string().required()
    }).required()
})

module.exports.studentSchema = joi.object({
    student: joi.object({
        name: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
        membership: joi.string().required(),
        email: joi.string().required(),
        membershipDate: joi.date().required()
    }).required()
})

module.exports.teacherSchema = joi.object({
    teacher: joi.object({
        name: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
        description: joi.string().required(),
    }).required()
})