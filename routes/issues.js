const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const UsersController = require('../controllers/users');
const Issue = require('../models/Issue');
const IssuesController = require('../controllers/issues');

router.route('/')
  .get(IssuesController.index)
  .post(
    passport.authenticate('jwt', { session: false }),
    IssuesController.create
  );

router.route('/users/:userId')
  .get(IssuesController.userIssues);

router.route('/stats')
  .get(IssuesController.issuesStats);

router.route('/latest-issues')
  .get(IssuesController.latestIssues);

router.route('/:facility')
  .get(IssuesController.facilityIssues);

/* GET SINGLE ISSUE BY ID */
router.route('/:id')
  .get(IssuesController.read)
  .put(IssuesController.update)
  .delete(IssuesController.delete);

module.exports = router;
