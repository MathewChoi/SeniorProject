import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/issues.css';
var moment = require('moment');

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

  onDelete(id){
    if (window.confirm("Are you sure?")) {
      axios.delete('/api/issues/'+id)
      .then((result) => {
        window.location.reload();
      });
    } 
  }

  render() {
    const issueItems = this.state.issues;
    return (
      <div className="card">
        <div className="card-header card-header-primary">
            <h4 className="card-title ">View all issues</h4>
        </div>
        <div className="card-body">
            <div className="table-responsive">
                <table className="table">
                    <thead className=" text-primary">
                        <th>
                         Issue Name   
                        </th>
                        <th>
                            Description
                        </th>
                        <th>
                            Building
                        </th>
                        <th>
                            Floor
                        </th>
                        <th>
                          Room
                        </th>
                        <th>
                            Category
                        </th>
                        <th>
                          Date Created
                        </th>
                    </thead>
                    <tbody>
                    {issueItems.map((issue, i) => {
                      var createdAt = moment(issue.createdAt).format('MM-DD-YYYY h:mm:ss a');
                return (
                  <tr key={i}>
                    <td>{issue.name}</td>
                    <td>{issue.description}</td>
                    <td>{issue.building}</td>
                    <td>{issue.floor}</td>
                    <td>{issue.room}</td>
                    <td>{issue.category}</td>
                    <td>{createdAt}</td>
                    <td>
                      <Link to={`/issues/${issue._id}`}>View</Link> | <Link to={`/issues/update/${issue._id}`}>Edit</Link> | <button onClick={this.onDelete.bind(this, issue._id)} className="btn btn-outline-danger">Delete</button>
                    </td>
                  </tr>
                )
              })}
                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    );
  }
}

export default Issues;