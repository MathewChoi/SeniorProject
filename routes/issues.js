var express = require('express');
var router = express.Router();
var Issue = require('../models/Issue');

/* GET ALL ISSUEs */
router.get('/', function(req, res, next) {
  Issue.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE ISSUE BY ID */
router.get('/:id', function(req, res, next) {
  Issue.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE ISSUE */
router.post('/', function(req, res, next) {
  Issue.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });  
});

/* UPDATE ISSUE */
router.put('/:id', function(req, res, next) {
  Issue.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE ISSUE */
router.delete('/:id', function(req, res, next) {
  Issue.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
