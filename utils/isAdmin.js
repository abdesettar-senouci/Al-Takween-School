const appErr = require('./appErr');

module.exports = (req, res, next) => {
    if (!(req.user.role === 'super admin' || req.user.role === 'admin')) {
        console.log('not auth')
        throw new appErr('not found',404);
    }
    next();
}