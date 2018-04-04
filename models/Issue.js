var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var IssueSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  building: {
    type: String,
  },
  floor: {
    type: String,
  },
  room: {
    type: String,
  },
  creator: {
    type: Schema.Types.ObjectId, ref: 'User'
  }
},
{ timestamps: true });

module.exports = mongoose.model('Issue', IssueSchema);
