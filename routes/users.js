const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();
const passport = require('passport');
const UsersController = require('../controllers/users');

router.route('/')
  .get(UsersController.index)
  .post(UsersController.register);

router.route('/auth')
  .post(UsersController.auth);

// Authenticated route new issue can not be created without jwt token supplied at login
router.post('/newIssue', passport.authenticate('jwt', {session: false}), UsersController.newIssue);

// Example of required auth: protect dashboard route with JWT
router.get('/dashboard',
  // Passport middleware
  passport.authenticate('jwt', { session: false }),
  UsersController.getDashboard);

router.route('/:userId')
  .get(UsersController.getUser)
  .put(UsersController.replaceUser)
  .patch(UsersController.updateUser);

router.route('/:userId/issues')
  .get(UsersController.getIssues);

module.exports = router;
