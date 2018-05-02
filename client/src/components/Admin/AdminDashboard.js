import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      data: {},
      users: [],
    };
  }

  componentWillMount(){

    var d = new Date();
    var m = d.getMonth();
    var y = d.getFullYear();

    // Get issues for this month
    axios.get(`/api/issues/date/${m}/${y}`)
    .then((res)=>{
      this.setState({data: res.data});
      this.setState({issues: res.data.issues});
    }).catch(err =>{
      console.log(err);
    });

    const header = { headers: {"Authorization": localStorage.getItem('token')}};
    axios.get(`/api/users/latest`, header)
    .then((res)=>{
      this.setState({users: res.data});
      // console.log(res.data);
    }).catch(err =>{
      console.log(err);
    });

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
    
    const { data, issues, users } = this.state;
    
    const { open, closed, inProgress } = data;

    // using momentjs for date formatting
    const date = moment().format('MMMM YYYY');

    return (
      <div>
        <h1>{date}</h1>
        <div className="row">
          <div className="col-md-4">
              <div className="card card-stats">
                  <div className="card-header card-header-danger card-header-icon">
                      <div className="card-icon">
                        <i className="material-icons">info_outline</i>
                      </div>
                      <p className="card-category">Open</p>
                      <h3 className="card-title">{open} Issues</h3>
                  </div>
                  <div className="card-footer">
                    <div className="stats">
                      <i className="material-icons">date_range</i> This Month
                    </div>
                  </div>
              </div>
          </div>
          <div className="col-md-4">
              <div className="card card-stats">
                  <div className="card-header card-header-warning card-header-icon">
                      <div className="card-icon">
                        <i className="material-icons">build</i>
                      </div>
                      <p className="card-category">In Progress</p>
                      <h3 className="card-title">{inProgress} Issues</h3>
                  </div>
                  <div className="card-footer">
                      <div className="stats">
                          <i className="material-icons">date_range</i> This Month
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-md-4">
              <div className="card card-stats">
                  <div className="card-header card-header-success card-header-icon">
                      <div className="card-icon">
                          <i className="material-icons">done</i>
                      </div>
                      <p className="card-category">Fixed</p>
                      <h3 className="card-title">{closed} Issues</h3>
                  </div>
                  <div className="card-footer">
                    <div className="stats">
                      <i className="material-icons">date_range</i> This Month
                    </div>
                  </div>
              </div>
          </div>
      </div>

      <div className="row">
        <div className="col-md-6">
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
                              {/* <th>Description</th> */}
                              <th>Building</th>
                              {/* <th>Floor</th>
                              <th>Room</th> */}
                              <th>Category</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {issues.map((issue, i) => {
                              return (
                                <tr key={i}>
                                  <td>{issue.name}</td>
                                  {/* <td>{issue.description}</td> */}
                                  <td>{issue.building}</td>
                                  {/* <td>{issue.floor}</td>
                                  <td>{issue.room}</td> */}
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
                      <div className="text-center">
                        <Link className="btn btn-primary" to="/admin/issues">
                          View More Issues
                        </Link>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      
        <div className="col-md-6">
            <div className="card">
                <div className="card-header card-header-primary">
                    <h4 className="card-title">New Users</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                            <thead className=" text-primary">
                              <tr>
                                <th>Email</th>
                                <th># Issues</th>
                                <th>Role</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {users.map((user, i) => {
                                return (
                                  <tr key={i}>
                                    <td>{user.email}</td>
                                    <td>{user.issues.length}</td>
                                    <td>{user.role}</td>                            
                                    <td className="td-actions">
                                      <Link to={`/admin/users/${user._id}`} className="btn btn-primary btn-link btn-sm"><i className="material-icons">search</i></Link>
                                      <Link to={`/admin/users/update/${user._id}`} className="btn btn-primary btn-link btn-sm"><i className="material-icons">mode_edit</i></Link>
                                      <button onClick={this.onDelete.bind(this, user._id)} className="btn btn-danger btn-link btn-sm"><i className="material-icons">close</i></button>
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                        </table>
                        <div className="text-center">
                          <Link className="btn btn-primary" to="/admin/users">
                            View More users
                          </Link>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default Dashboard;
