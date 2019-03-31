let mongoose = require('mongoose');

let blankSchema = new mongoose.Schema({
    text: String,
    workspaceId: String,
    index: Number
})

module.exports = mongoose.model('Blank', blankSchema);
