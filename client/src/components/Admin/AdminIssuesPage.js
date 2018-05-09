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
    const header = { headers: {"Authorization": localStorage.getItem('token')}};
    if (window.confirm("Are you sure?")) {
      axios.delete('/api/issues/'+id,header)
      .then((result) => {
        window.location.reload();
      });
    } 
  }

  render() {
    const issues = this.state.issues;
    
    return (
      <div className="card">
          <div className="card-header card-header-primary">
              <h4 className="card-title">Latest Posted Issues</h4>
          </div>
          <div className="card-body">
              <div className="table-responsive">
                  <table className="table">
                      <thead className=" text-primary">
                        <tr>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Building</th>
                          <th>Floor</th>
                          <th>Room</th>
                          <th>Category</th>
                          <th></th>
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
                              <td className="td-actions">
                                <Link to={`/issues/${issue._id}`} className="btn btn-primary btn-link btn-sm"><i className="material-icons">search</i></Link>
                                <Link to={`/issues/update/${issue._id}`} className="btn btn-primary btn-link btn-sm"><i className="material-icons">mode_edit</i></Link>
                                <button onClick={this.onDelete.bind(this, issue._id)} className="btn btn-danger btn-link btn-sm"><i className="material-icons">close</i></button>
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

export default AdminDashboard;
