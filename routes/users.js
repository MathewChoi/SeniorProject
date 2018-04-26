const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const UsersController = require('../controllers/users');
const IssuesController = require('../controllers/issues');

router.route('/')
  // List all the users
  .get(passport.authenticate('jwt', { session: false }),
    UsersController.index)
  // Register a new user
  .post(UsersController.register);

router.route('/auth')
  // Signin returns jwt
  .post(UsersController.auth);

// Example of required auth: protect dashboard route with JWT
router.route('/dashboard')
  .get(
    passport.authenticate('jwt', { session: false }),
    UsersController.getDashboard);
 


router.route('/:userId')
  // Get user details
  .get(passport.authenticate('jwt', { session: false }),
    UsersController.getUser)
  // Update user information by replacing
  .put(passport.authenticate('jwt', { session: false }),
    UsersController.replaceUser)
  // Update user information by patching
  .patch(passport.authenticate('jwt', { session: false }),
    UsersController.updateUser);


module.exports = router;
