const User = require('../models/User');
const Issue = require('../models/Issue');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {

  // Get all users
  index: async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json(users); // 201 - OK
  },

  // Authenticate user return jwt token to be store in local storage on client side
  register: async (req, res, next) => {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(201).json(user); // 201 - Created
    
  },

  // Get User information
  getUser: async (req, res, next) => {
    const {userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  },

  // Get User information
  replaceUser: async (req, res, next) => {
    // TODO: Enforce body contains all fields
    const {userId } = req.params;
    const newUser = req.body;
    const result = await User.findByIdAndUpdate(userId,newUser);
    res.status(200).json({success: true});
  },

  // Get User information
  updateUser: async (req, res, next) => {
    // Body may contain any number of fields
    const {userId } = req.params;
    const newUser = req.body;
    const result = await User.findByIdAndUpdate(userId,newUser);
    res.status(200).json({success: true});
  },
  
  // Authenticate user
  // TODO: Convert to async/await function
  auth: (req, res, next) => {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;
  
      if (!user) {
        res.send({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else {
        // Check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // Create token if the password matched and no error was thrown
            const token = jwt.sign(user.toObject(), config.auth.secret, {
              expiresIn: "2 days"
            });
            res.json({
              success: true,
              message: 'Authentication successfull',
              token
            });
          } else {
            res.send({
              success: false,
              message: 'Authentication failed. Passwords did not match.'
            });
          }
        });
      }
    });
  },

  // View all issues created by user
  getIssues: async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('issues');
    res.status(200).json(user.issues);
  },

  getDashboard: (req, res, next) => {
    res.status(200).json(req.user);
  },

  newIssue: async (req, res, next) => {
    // Get Id from url
    const userId  = req.user._id;
    // Create new issue
    const newIssue = new Issue({
      "name": req.body.name,
      "description": req.body.description,
      "building": req.body.building,
      "floor": req.body.floor,
      "room": req.body.room
    });
    // Get user
    const user = await User.findById(userId);
    // Assign user and issue creator
    newIssue.creator = user;
    // Save the issue
    await newIssue.save();
    // Add the new issue to the users issue array
    user.issues.push(newIssue);
    // Save the updated user
    await user.save();
    // Send status code 201 - Created and new Issue as json
    res.status(201).json(newIssue);
  },

}

  // OLD ROUTES
  // // Authenticate user return jwt token to be store in local storage on client side
  // register: (req, res, next) => {
  //   if (!req.body.email || !req.body.password) {
  //     res.json({
  //       success: false,
  //       message: 'Please enter email and password.'
  //     });
  //   } else {
  //     let newUser = new User({
  //       email: req.body.email,
  //       password: req.body.password
  //     });
  
  //     // Attempt to save the user
  //     newUser.save(function(err) {
  //       if (err) {
  //         return res.json({
  //           success: false,
  //           message: 'That email address already exists.'
  //         });
  //       }
  //       res.json({
  //         success: true,
  //         message: 'Successfully created new user.'
  //       });
  //     });
  //   }
  // },

  // // View all issues created by user
  // getIssues: (req, res, next) => {
  //   User.findById({_id: req.params.id}).populate('issues').exec(function(err, user) {
  //     res.json(user.populate().issues);
  //   });
  // },
  // Create a issue
  // newIssue: (req, res, next) =>{

  //   const newIssue = new Issue({
  //     name: req.body.name,
  //     description: req.body.description,
  //     building: req.body.building,
  //     floor: req.body.floor,
  //     room: req.body.room,
  //     creator: req.user._id
  //   });

  //   User.findById(req.user._id, (err, user, next) => {
  //     if (err) return next(err);
  //     user.issues.push(newIssue);
  //     user.save();
  //   });


  //   newIssue.save(function(err) {
  //     if (err) return next(err);
      
  //     res.json({
  //       success: true,
  //       message: 'Successfully created new issue.'
  //     });

  //   });
    
  // }

