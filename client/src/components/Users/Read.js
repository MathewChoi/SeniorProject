import React, { Component } from 'react';
import axios from 'axios';

class ReadUser extends Component {

  constructor(){
    super();
    this.state = {
      user: {},
      issues: []
    }
  }

  componentWillMount(){
    this.getUsers();
  }

  getUsers(){
    axios.get('/api/users/'+this.props.match.params.id)
      .then(res => {
        this.setState({user: res.data});
        this.setState({issues: res.data.issues});
      })
      .catch(err => console.log(err));
  }

  onDelete(id){
    axios.delete('/api/users/'+id)
      .then((result) => {
        this.props.history.push("/users")
      });
  }

  render() {
    const { user, issues } = this.state;

    return (
      <div>
        <h1>User</h1>
          <p>ID: {user._id}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <p># Issues: {issues.length}</p>
          <p>Created At: {user.createdAt}</p>
          <p>Updated At: {user.updatedAt}</p>
      </div>
    );
  }
}

export default ReadUser;