const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const UsersController = require('../controllers/users');
const Issue = require('../models/Issue');
const IssuesController = require('../controllers/issues');
const Facility = require('../models/Facility');
const FacilitiesController = require('../controllers/facilities');

router.route('/')
    .get(FacilitiesController.index)
    .post(
        passport.authenticate('jwt', {session: false}),
        FacilitiesController.create  
    );

router.route('/:id')
    .get(FacilitiesController.read)
    .put(FacilitiesController.addFloor)
//     .delete(FacilitiesController.delete);

module.exports = router;