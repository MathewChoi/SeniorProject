import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from './Helpers/Authentication.js';
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
      <div className="card" style={{width:'880px'}}>
        <div className="card-header card-header-primary">
            <h1 className="card-title ">View all issues</h1>
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
                      <button className="fa fa-eye" onClick={()=>{this.props.history.push(`/issues/${issue._id}`);}} />
                      { (auth.getUser() === issue.creator || auth.isAdmin()) && <button className="fa fa-pencil" onClick={()=>{this.props.history.push(`/issues/update/${issue._id}`);}} /> } &nbsp;
                      { (auth.getUser() === issue.creator || auth.isAdmin()) && <button className="fa fa-trash" onClick={this.onDelete.bind(this, issue._id)} /> }
                      
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