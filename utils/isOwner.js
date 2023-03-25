const Course = require('../models/course');

module.exports = async (req, res, next) => {
    const course = await Course.findById(req.params.id).populate('teacher');
    if (!(toString(req.user._id) === toString(course.teacher._id) )) {
        req.flash('error','not authorized');
        return res.redirect('/');
    }
    next();
}