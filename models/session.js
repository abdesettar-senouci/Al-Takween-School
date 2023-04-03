const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    title:String,
    description:String,
});

const session = mongoose.model('Event',sessionSchema);
module.exports = session;
