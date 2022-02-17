var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var analyticsSchema = new Schema({
    name: String,
    count: Number,
});

const analytics = mongoose.model('analytics', analyticsSchema)

module.exports = analytics;