const User = require('../models/User');
const Issue = require('../models/Issue');

module.exports = {

  // get all issues
  index: async (req, res, next) => {
    const issues = await Issue.find({}).sort( {"createdAt" : -1});
    res.status(200).json(issues);
  },

  // get issues stats
  issuesStats: async (req, res, next) => {
    const openCount = await Issue.find({"status":"OPEN"}).count();
    const closedCount = await Issue.find({"status":"CLOSED"}).count();
    const inProgressCount = await Issue.find({"status":"IN PROGRESS"}).count();
    const assignedCount = await Issue.find({"status":"ASSIGNED"}).count();
    const onHoldCount = await Issue.find({"status":"ON HOLD"}).count();
    res.status(200).json({openIssues:openCount, closedIssues:closedCount, inProgressIssues:inProgressCount,
                          assignedIssues:assignedCount, onHoldIssues:onHoldCount});
  },

  issuesByMonth: async (req, res, next) => {
    
    //get month and year from url /api/issues/:month/:year
    const { month, year } = req.params;
    
    // parse string to int
    const yeari = parseInt(year);
    const monthi = parseInt(month);

    const start = new Date(yeari, monthi);
    const end = new Date(yeari, monthi+1);
    
    const allissues = await Issue
      .find({"updatedAt": {"$gte": start, "$lt": end}})
      .sort( {"createdAt" : -1});

    const open = allissues.filter(issue => issue.status === 'OPEN').length;
    const inProgress = allissues.filter(issue => issue.status === 'IN PROGRESS').length;
    const closed = allissues.filter(issue => issue.status === 'CLOSED').length;

    const issues = allissues.splice(0,5);

    data = {
      issues,
      open,
      inProgress,
      closed
    }

    res.status(200).json(data);
  },

  latestIssues: async (req, res, next) => {
    const latestIssues = await Issue.find({}).sort( {"createdAt" : -1}).limit(10);
    res.status(200).json(latestIssues);
  },
  // View all issues created by user
  userIssues: async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('issues');
    res.status(200).json(user.issues);
  },

  // Create new issue using userid passed from the decoded jwt
  create: async (req, res, next) => {
    // Get Id from url
    const userId  = req.user._id;
    // Create new issue
    const newIssue = new Issue({
      "name": req.body.name,
      "description": req.body.description,
      "building": req.body.building,
      "floor": req.body.floor,
      "room": req.body.room,
      "category": req.body.category,
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

  // view a single issue
  read: async (req, res, next) => {
    // get id params
    const { id } = req.params;
    // Search for issue using id from params
    const issue = await Issue.findById(id);
    // return the issue
    if(issue === null){
      res.status(404);
    }
    res.status(200).json(issue);
  },

  // update an issue using id from url params
  update: async (req, res, next) => {
    const user  = req.user; // user from passport authentication
    const { id } = req.params;

    const issueToUpdate = await Issue.findById(id);
    
    // Use .equals for object comparison
    if(issueToUpdate.creator.equals(user._id) || user.role === "ADMIN"){

      const newIssue = req.body;
      const status = req.body.status;
      newIssue.status = issueToUpdate.status;
      
      if( user.role === "ADMIN" ){
        newIssue.status = status;
      }

      const result = await Issue.findByIdAndUpdate(id,newIssue);
      res.status(200).json({success: true});
    }else{
      res.status(401).json({success: false});
    }
    
  },

  // delete an issue using id from url params
  delete: async (req, res, next) => {
    const user  = req.user; // user from passport authentication
    const { id } = req.params;
    
    const issueToDelete = await Issue.findById(id);
    if(issueToDelete.creator.equals(user._id) || user.role === "ADMIN"){
      const result = await Issue.findByIdAndRemove(id);
      res.status(200).json({success: true});
    }else{
      res.status(401).json({success: false});
    }
    
    
  }

}
