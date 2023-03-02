const joi = require('joi');
const AppErr = require('./appErr')

//validating middleware
module.exports=function validate(Schema){
    return validateschema = (req, res, next) => {
    const { error } = Schema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new AppErr(msg, 400)
    } else {
        next();
    }
}}
