import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/Issues.css';
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
          var date = new Date (String(issue.createdAt).substring(0,19));
          var time =String(issue.createdAt).substring(11,16);
          var dateCreated = (date.getMonth()+1)+"-" + (date.getDate()) + "-" +date.getFullYear() + "   " + time ;
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
              <p className="spacing">Created At: {dateCreated}</p>
        
            </div>
          )
        })}
      </div>
    );
  }
}

export default Issues;