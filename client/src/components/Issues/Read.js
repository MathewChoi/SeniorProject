import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        this.setState({issue: res.data}, () =>{
        })
      })
      .catch(err => console.log(err));
  }

  onDelete(id){
    axios.delete('/api/issues/'+id)
      .then((result) => {
        this.props.history.push("/issues")
      });
  }

  render() {
    const issue = this.state.issue;
    return (
      <div>
        <h1>Issues</h1>
          <p>Name: {issue.name}</p>
          <p>Description: {issue.description}</p>
          <p>Building: {issue.building}</p>
          <p>Floor: {issue.floor}</p>
          <p>Room: {issue.room}</p>
          <p>Created At: {issue.createdAt}</p>
          
          <Link className="btn btn-outline-primary" to={`update/${issue._id}`}>Edit</Link>
          <button onClick={this.onDelete.bind(this, this.state.issue._id)} className="btn btn-outline-danger">Delete</button>
      </div>
    );
  }
}

export default ReadIssue;