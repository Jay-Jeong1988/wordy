let express = require('express');
let router = express.Router();
var db = require('../db/db');
const Workspace = require('../db/models/Workspace');
const Blank = require('../db/models/Blank');

router.get('/:userId/ws', (req, res) => {
    Workspace.find({userId: req.params.userId}, function (err, workspaces) {
        if (err) return console.error(err);
        res.status(200).json(workspaces);
    })
})

router.get('/:id', (req, res) => {
    Workspace.findById(req.params.id, function (err, workspace) {
        if (err) return console.error(err);
        console.log("successfully loaded a data");
        res.json(workspace);
    })
})

router.post('/create', (req, res) => {
    let ws = new Workspace(req.body);
    if (!ws.title) ws.title = "No Title";
    ws.save().then(instance => {
        res.status(200).json({
            msg: "successfully saved a document",
            created: instance
        });
        console.log('successfully saved a document');
    }).catch(error => {
        res.status(500).json({
            msg: error.message
        })
        console.log(error);
    })
})

router.post('/:wId/update', (req, res) => {
    Workspace.findById(req.params.wId, function (err, workspace) {
        workspace.contents = req.body.contents;
        workspace.length = req.body.contents.length;
        workspace.lastSavedAt = Date.now();
        workspace.lastIndex = req.body.lastIndex;
        workspace.save().then(instance => {
            console.log("workspace has been updated");
            res.status(200).json({
                msg: "workspace has been updated"
            });
        }).catch(error => {
            res.status(500).json({
                error: error
            })
            console.log(error);
        })
    })
})

router.get('/:wId/destroy', (req, res) => {
    Workspace.findByIdAndDelete(req.params.wId, function(err, result) {
        if (err) return console.error(err);
        console.log("successfully deleted a workspace");
        res.status(200).json({
            msg: "successfully deleted a workspace",
            result: result
        })
    })
})

router.post('/:wId/blanks/create', (req, res) => {
    const blank = new Blank(req.body);
    blank.save().then(instance => {
        res.status(200).json({
            msg: "successfully saved a blank",
            created: instance
        });
        console.log('successfully saved a blank');
        console.log(instance);
    }).catch(error => {
        res.status(500).json({
            error: error
        })
        console.log(error);
    })
})

router.get('/:wId/blanks/:index', (req, res) => {
    Blank.findOne({workspaceId: req.params.wId, index: req.params.index}, function(err, blank) {
        if (err) return console.error(err);
        console.log("successfully loaded a data");
        console.log(blank);
        res.json(blank);
    })
})

router.get('/:wId/blanks/:index/destroy', (req, res) => {
    Blank.findOneAndDelete({workspaceId: req.params.wId, index: req.params.index}, function(err, result) {
        if (err) return console.error(err);
        console.log("successfully deleted a blank");
        console.log(result)
        res.status(200).json({
            msg: "successfully deleted a blank",
            result: result
        })
    })
})

router.get('/:wId/blanks', (req, res) => {
    Blank.find({workspaceId: req.params.wId}, function (err, blanks) {
        if (err) return console.error(err);
        console.log("successfully loaded blanks for workspace id:" + req.params.wId);
        res.status(200).json({
            msg: "successfully loaded blanks for workspace id: " + req.params.wId,
            result: blanks
        })
    })
})


module.exports = router;