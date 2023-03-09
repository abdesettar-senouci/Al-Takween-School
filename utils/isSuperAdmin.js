const appErr = require('./appErr');

module.exports = (req, res, next) => {
    if (!(req.user.role === 'super admin')) {
        throw new appErr('not found',404);
    }
    next();
}