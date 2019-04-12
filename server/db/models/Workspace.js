let mongoose = require('mongoose');

let workspaceSchema = new mongoose.Schema({
    title: String,
    length: {type: Number, default: 0, min: 0, max: 70000},
    contents: String,
    createdAt: {type: Date, default: Date.now},
    lastSavedAt: {type: Date, default: Date.now},
    lastIndex: {type: Number, default: 0, min: 0},
    userId: {type: String, required: true}
})

workspaceSchema.virtual('detail').get(function() {
    return `Title of document is ${this.title} and the length is ${this.length}.`;
  });

module.exports = mongoose.model('Workspace', workspaceSchema);
