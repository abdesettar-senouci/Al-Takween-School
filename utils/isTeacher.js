module.exports = (req, res, next) => {
    if (!(req.user.role === 'teacher')) {
        req.flash('error','you must be a teacher');
        res.redirect('/')
    }
    next();
};