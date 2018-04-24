import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AdminDashboard extends Component {

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
    const issues = this.state.issues;
    
    return (
      <div>

        <h2>Issues</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Building</th>
              <th scope="col">Floor</th>
              <th scope="col">Room</th>
              <th scope="col">Category</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue, i) => {
              return (
                <tr key={i}>
                  <td>{issue.name}</td>
                  <td>{issue.description}</td>
                  <td>{issue.building}</td>
                  <td>{issue.floor}</td>
                  <td>{issue.room}</td>
                  <td>{issue.category}</td>
                  <td>
                    <Link to={`/issues/${issue._id}`}>View</Link> | <Link to={`/issues/update/${issue._id}`}>Edit</Link> | <button onClick={this.onDelete.bind(this, issue._id)} className="btn btn-outline-danger">Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AdminDashboard;
