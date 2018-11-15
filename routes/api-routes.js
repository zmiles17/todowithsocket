const db = require("../models/checklist.js");

module.exports = function (app) {
    app.get("/api/checklist", function (req, res) {
        db.find({})
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            })
    })
    app.post("/api/checklist", function (req, res) {
        db.create(req.body)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            })
    })
    app.put("/api/checklist/:id", function (req, res) {
        db.findByIdAndUpdate(req.params.id, { $set: { completed: true } })
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            })
    })
    app.delete("/api/checklist/:id", function (req, res) {
        db.findByIdAndDelete(req.params.id).then(function (data) {
            res.json(data);
        })
            .catch(function (err) {
                res.json(err);
            })
    })
}