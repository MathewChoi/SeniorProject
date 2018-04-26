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

  latestIssues: async (req, res, next) => {
    const latestIssues = await Issue.find({}).sort( {"createdAt" : -1}).limit(10);
    res.status(200).json(latestIssues);
  },
  // View all issues created by user
  userIssues: async (req, res, next) => {
    const { userId } = req.params;
    // const user = await User.findById(userId).populate('issues');
    const issues = await Issue.find({"creator" : userId})
    res.status(200).json(issues);
  },

  facilityIssues:async (req, res, next) => {
    const {facility} = req.params;
    const sortBy = req.query.sort.toString();
    //req.query.order = parseInt(req.query.order);
    const order = parseInt(req.query.order,2);
    //console.log(sortBy == 'createdAt'.toString());
    var facilityIssues;
    if(sortBy == 'createdAt'.toString())
    {
      facilityIssues = await Issue.find({"building": facility}).sort( {"createdAt" : order});
    }
    if(sortBy == 'name'.toString())
    {
      facilityIssues = await Issue.find({"building": facility}).sort( {"name" : order, "createdAt":-1});
    }
    if(sortBy == 'floor'.toString())
    {
      facilityIssues = await Issue.find({"building": facility}).sort( {"floor" : order, "room":1, "createdAt":-1});
    }
    res.status(200).json(facilityIssues);
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
    // user.issues.push(newIssue); deprecated
    // Save the updated user
    // await user.save();
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
    res.status(200).json(issue);
  },

  // update an issue using id from url params
  update: async (req, res, next) => {
    const { id } = req.params;
    const newIssue = req.body;
    const result = await Issue.findByIdAndUpdate(id,newIssue);
    res.status(200).json({success: true});
  },

  // delete an issue using id from url params
  delete: async (req, res, next) => {
    const { id } = req.params;
    const result = await Issue.findByIdAndRemove(id);
    res.status(200).json({success: true});
  }

}
