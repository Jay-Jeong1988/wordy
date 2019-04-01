let express = require('express');
let router = express.Router();
var db = require('../db/db');
const Workspace = require('../db/models/Workspace');
const Blank = require('../db/models/Blank');

router.get('/', (req, res) => {
    Workspace.find(function (err, workspaces) {
        if (err) return console.error(err);
        res.json(workspaces);
    })
})

router.get('/:id', (req, res) => {
    Workspace.findById(req.params.id, function (err, workspace) {
        if (err) return console.error(err);
        console.log("successfully loaded a data");
        console.log(workspace);
        res.json(workspace);
    })
})

router.post('/create', (req, res) => {
    let ws = new Workspace(req.body);
    if (!ws.title) ws.title = "no title";
    ws.save().then(instance => {
        res.status(200).json({
            msg: "successfully saved a document",
            created: instance
        });
        console.log('successfully saved a document');
        console.log(instance);
    }).catch(error => {
        res.status(500).json({
            error: error
        })
        console.log(error);
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


module.exports = router;