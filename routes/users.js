const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const UsersController = require('../controllers/users');

router.route('/')
  // List all the users
  .get(UsersController.index)
  // Register a new user
  .post(UsersController.register);

router.route('/auth')
  // Signin returns jwt
  .post(UsersController.auth);

router.route('/:userId')
  // Get user details
  .get(UsersController.getUser)
  // Update user information by replacing
  .put(UsersController.replaceUser)
  // Update user information by patching
  .patch(UsersController.updateUser);

// Example of required auth: protect dashboard route with JWT
router.get('/dashboard',
  // Passport middleware
  passport.authenticate('jwt', { session: false }),
  UsersController.getDashboard);

module.exports = router;
