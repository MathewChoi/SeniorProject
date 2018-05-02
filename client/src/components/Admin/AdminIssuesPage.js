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
      // <div className="card">
      //   <div class="card-header card-header-warning">
      //     <h4 class="card-title">Employees Stats</h4>
      //     <p class="card-category">New employees on 15th September, 2016</p>
      //   </div>
      //   <h2>Issues</h2>
      //   <div className="card-body table-responsive">
      //     <table className="table">
      //       <thead>
      //         <tr>
      //           <th scope="col">Name</th>
      //           <th scope="col">Description</th>
      //           <th scope="col">Building</th>
      //           <th scope="col">Floor</th>
      //           <th scope="col">Room</th>
      //           <th scope="col">Category</th>
      //         </tr>
      //       </thead>
      //       <tbody>
      //         {issues.map((issue, i) => {
      //           return (
      //             <tr key={i}>
      //               <td>{issue.name}</td>
      //               <td>{issue.description}</td>
      //               <td>{issue.building}</td>
      //               <td>{issue.floor}</td>
      //               <td>{issue.room}</td>
      //               <td>{issue.category}</td>
      //               <td>
      //                 <Link to={`/issues/${issue._id}`}>View</Link> | <Link to={`/issues/update/${issue._id}`}>Edit</Link> | <button onClick={this.onDelete.bind(this, issue._id)} className="btn btn-outline-danger">Delete</button>
      //               </td>
      //             </tr>
      //           )
      //         })}
      //       </tbody>
      //     </table>
      //   </div>
      // </div>
      <div className="row">
        <div class="col-md-12">
          <div class="card">
              <div class="card-header card-header-primary">
                  <h4 class="card-title">Latest Posted Issues</h4>
              </div>
              <div class="card-body">
                  <div class="table-responsive">
                      <table class="table">
                          <thead class=" text-primary">
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
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
