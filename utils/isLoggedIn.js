const appErr = require('./appErr')

module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        if(req.session.returnTo.indexOf('/superadmin') === 0 || req.session.returnTo.indexOf('/admin') === 0){
            throw new appErr('not found',404);
        }
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/');
    }
    next();
}