import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

class AdminDashboard extends Component {

  constructor(){
    super();
    this.state = {
      users: []
    }
  }

  componentWillMount(){
    this.getUsers();
  }

  getUsers(){
    const header = { headers: {"Authorization": localStorage.getItem('token')}};

    axios.get('/api/users', header)
      .then(res => {
        this.setState({users: res.data}, () =>{
          // console.log(this.state)
        })
      })
      .catch(err => console.log(err));
  } 
  
  onDelete(id){
    if (window.confirm("Are you sure?")) {
      alert("//TODO: Add delete user functionality");
    } 
  }

  render() {
    const users = this.state.users;
    
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
              <div className="card-header card-header-primary">
                  <h4 className="card-title">Users</h4>
              </div>
              <div className="card-body">
                  <div className="table-responsive">
                      <table className="table">
                          <thead className=" text-primary">
                            <tr>
                              <th>Email</th>
                              {/* <th># Issues</th> */}
                              <th>Role</th>
                              <th>Created At</th>
                              <th>Updated At</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((user, i) => {
                              var fomatted_Created = moment(user.createdAt).format('MM-DD-YYYY hh:mm');
                              var fomatted_Updated = moment(user.updatedAt).format('MM-DD-YYYY hh:mm');
                              return (
                                <tr key={i}>
                                  <td>{user.email}</td>
                                  {/* <td>{user.issues.length}</td> */}
                                  <td>{user.role}</td>
                                  <td>{ fomatted_Created }</td>
                                  <td>{ fomatted_Updated }</td>
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
                  </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
