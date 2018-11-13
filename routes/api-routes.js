const db = require("../models/checklist.js");

module.exports = function(app){
    app.get("/checklist", function(req, res){
        db.find({})
        .then(function(data){
            res.json(data);
        })
        .catch(function(err){
            res.json(err);
        })
    })
    app.post("/checklist", function(req, res){
        db.create(req.body)
        .then(function(data){
            res.json(data);
        })
        .catch(function(err){
            res.json(err);
        })
    })
    app.put("/checklist/:id", function(req, res){
        db.findByIdAndUpdate({ _id: req.params.id }, { $set:{ completed: true } })
        .then(function(data){
            res.json(data);
        })
        .catch(function(err){
            res.json(err);
        })
    })
}