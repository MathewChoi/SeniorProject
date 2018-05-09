import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import auth from '../Helpers/Authentication';
import NotFound from '../Notfound';

var moment = require('moment');

class ReadIssue extends Component {

  constructor(){
    super();
    this.state = {
      issue: {}
    }
  }

  componentWillMount(){
    this.getIssues();
  }

  getIssues(){
    axios.get('/api/issues/'+this.props.match.params.id)
      .then(res => {
        this.setState({issue: res.data});
      })
      .catch(err => console.log(err));
  }

  onDelete(id){
    const header = { headers: {"Authorization": localStorage.getItem('token')}};
    if (window.confirm("Are you sure?")) {
      axios.delete('/api/issues/'+id,header)
      .then((result) => {
        this.props.history.goBack();
      });
    } 
  }

  render() {
    const issue = this.state.issue;
    if(issue != null){
      var createdAt = moment(issue.createdAt).format('MM-DD-YYYY h:mm:ss a');
      return (
        <div className="card">
          <div className="card-header card-header-primary">
            <h1 className="card-title ">{issue.name}</h1>
          </div>
          <div className="card-body">
            <p>Description: {issue.description}</p>
            <p>Building: {issue.building}</p>
            <p>Floor: {issue.floor}</p>
            <p>Room: {issue.room}</p>
            <p>Category: {issue.category}</p>
            <p>Status: {issue.status}</p>
            <p>Status Description: {issue.statusDescription}</p>
            <p>Created At: {createdAt}</p>
            { (auth.getUser() === issue.creator || auth.isAdmin()) && <Link className="btn btn-outline-primary" to={`update/${issue._id}`}>Edit</Link> } &nbsp;
            { (auth.getUser() === issue.creator || auth.isAdmin()) && <button onClick={this.onDelete.bind(this, this.state.issue._id)} className="btn btn-outline-danger">Delete</button> }
          </div>
        </div>
      );
    }
    else{
      return (
        <NotFound />
      );
    }
  }
}

export default ReadIssue;