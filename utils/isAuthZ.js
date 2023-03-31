module.exports = (authorized)=>{
    return (req, res, next) => {
    if (!(authorized.includes(req.user.role))) {
        req.flash('error','you must be a teacher');
        res.redirect('/')
    }
    next();
};
} 