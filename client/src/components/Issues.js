import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
<<<<<<< HEAD
import '../stylesheets/Issues.css';
=======
import '../styles/issues.css';
var moment = require('moment');

>>>>>>> origin/sprint4
class Issues extends Component {

  constructor(){
    super();
    this.state = {
      issues: []
    }
  }

  componentWillMount(){
    this.getIssues();
  }

  getIssues(){
    axios.get('/api/issues')
      .then(res => {
        this.setState({issues: res.data}, () =>{
          // console.log(this.state)
        })
      })
      .catch(err => console.log(err));
  } 

  render() {
    const issueItems = this.state.issues;
    return (
      <div>
        <h1>Issues</h1>
        {issueItems.map((issue, i) => {
          var createdAt = moment(issue.createdAt).format('MM-DD-YYYY h:mm:ss a');
          
          return (
            <div className="dark" key={i}>
              <Link to={`/issues/${issue._id}`} className="title">
                {issue.name}
              </Link>
              <p className="spacing" >Description: {issue.description}</p>
              <div className="location">
                <p className="spacing">Building: {issue.building}</p>
                <p className="spacing">Floor: {issue.floor}</p>
                <p className="spacing">Room: {issue.room}</p>
              </div>
              <p className="spacing">Category: {issue.category}</p>
              <p className="spacing">Status: {issue.status}</p>
              <p className="spacing">Created At: {createdAt}</p>
        
            </div>
          )
        })}
      </div>
    );
  }
}

export default Issues;