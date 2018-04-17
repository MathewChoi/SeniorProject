import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

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
    axios.get('/api/users')
      .then(res => {
        this.setState({users: res.data}, () =>{
          // console.log(this.state)
        })
      })
      .catch(err => console.log(err));
  } 

  render() {
    const users = this.state.users;
    
    return (
      <div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Email</th>
              <th scope="col"># Issues</th>
              <th scope="col">Role</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => {
              var fomatted_Created = moment(user.createdAt).format('MM-DD-YYYY hh:mm');
              var fomatted_Updated = moment(user.updatedAt).format('MM-DD-YYYY hh:mm');
              return (
                <tr key={i}>
                  <th scope="row">{user._id}</th>
                  <td>{user.email}</td>
                  <td>{user.issues.length}</td>
                  <td>{user.role}</td>
                  <td>{ fomatted_Created }</td>
                  <td>{ fomatted_Updated }</td>
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
