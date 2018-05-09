import React, { Component } from 'react';
import axios from 'axios';
import auth from '../Helpers/Authentication';
import { Link } from 'react-router-dom';

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
    const header = { headers: {"Authorization": localStorage.getItem('token')}};
    axios.get('/api/users/'+this.props.match.params.id,header)
      .then(res => {
        this.setState({user: res.data});
        this.setState({issues: res.data.issues});
      })
      .catch(err => console.log(err));
  }

  onDelete(id){
    if (window.confirm("Are you sure?")) {
      alert("//TODO: Add delete user functionality");
    } 
  }

  render() {
    const { user, issues } = this.state;

    return (
      <div className="card">
        <div className="card-header card-header-primary">
          <h1 className="card-title ">User</h1>
        </div>
        <div className="card-body">
          <p>ID: {user._id}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <p>Created At: {user.createdAt}</p>
          <p>Updated At: {user.updatedAt}</p>
          { (auth.getUser() === user._id || auth.isAdmin()) && <Link className="btn btn-outline-primary" to={`update/${user._id}`}>Edit</Link> } &nbsp;
          { (auth.getUser() === user._id || auth.isAdmin()) && <button onClick={this.onDelete.bind(this, this.state.user._id)} className="btn btn-outline-danger">Delete</button> }
        </div>
      </div>
      // <div>
      //   <h1>User</h1>
      //     <p>ID: {user._id}</p>
      //     <p>Email: {user.email}</p>
      //     <p>Role: {user.role}</p>
      //     <p># Issues: {issues.length}</p>
      //     <p>Created At: {user.createdAt}</p>
      //     <p>Updated At: {user.updatedAt}</p>
      // </div>
    );
  }
}

export default ReadUser;