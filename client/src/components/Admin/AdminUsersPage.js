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
      <div>
        <h2>Users</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Email</th>
              {/* <th scope="col"># Issues</th> */}
              <th scope="col">Role</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => {
              if (user !== undefined){
                var fomatted_Created = moment(user.createdAt).format('MM-DD-YYYY hh:mm');
                var fomatted_Updated = moment(user.updatedAt).format('MM-DD-YYYY hh:mm');
                return (
                  <tr key={i}>
                  <td>{user.email}</td>
                  {/* <td>{user.issues.length}</td> */}
                  <td>{user.role}</td>
                  <td>{ fomatted_Created }</td>
                  <td>{ fomatted_Updated }</td>
                  <td>
                    <Link to={`/admin/users/${user._id}`}>View</Link> | <Link to={`/admin/users/update/${user._id}`}>Edit</Link> | <button onClick={this.onDelete.bind(this, user._id)} className="btn btn-outline-danger">Delete</button>
                  </td>
                </tr>
              )
              }
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AdminDashboard;
