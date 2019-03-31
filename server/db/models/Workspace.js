let mongoose = require('mongoose');

let workspaceSchema = new mongoose.Schema({
    title: String,
    length: {type: Number, default: 0, min: 0},
    contents: String,
    createdAt: {type: Date, default: Date.now},
    lastSavedAt: {type: Date, default: Date.now},
})

workspaceSchema.virtual('detail').get(function() {
    return `Title of document is ${this.title} and the length is ${this.length}.`;
  });

module.exports = mongoose.model('Workspace', workspaceSchema);
