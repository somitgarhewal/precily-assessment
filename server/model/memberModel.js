var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new Schema({
    name: String,
    age: String,
});

const member = mongoose.model('member', memberSchema)

module.exports = member;