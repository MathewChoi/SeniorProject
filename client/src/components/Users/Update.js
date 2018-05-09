import React, { Component } from 'react';
import axios from 'axios';

class UpdateIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      issues: [],
      role: ''
    };
  }
  
  componentWillMount(){
    // populate state variables with the current values for the issue stored in the database
    const header = { headers: {"Authorization": localStorage.getItem('token')}};
    const id = this.props.match.params.id;
    axios.get('/api/users/'+id, header)
      .then(res => {
        this.setState({user: res.data});
        this.setState({issues: res.data.issues});
        this.setState({role: res.data.role});
      })
      .catch(err => console.log(err));
  }

  onChange = (event) => {
    const state = this.state
    state[event.target.name] = event.target.value;
    this.setState(state);
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    
    const role = this.state.role;
    const id = this.state.user._id;
    const header = { headers: {"Authorization": localStorage.getItem('token')}};
    const data = {
      role
    }
    axios.patch('/api/users/'+id, data, header)
    .then((res) => {
      this.props.history.goBack();
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    const { user, issues, role } = this.state;
    return (
      <div className="card">
        <div className="card-header card-header-primary">
          <h1 className="card-title ">Edit User</h1>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <p>ID: {user._id}</p>
            <p>Email: {user.email}</p>
            <p>Role:
              <select className="form-control" value={role} name="role" onChange={this.onChange}>
                <option value="ADMIN">ADMIN</option>
                <option value="PERSONNEL">PERSONNEL</option>
                <option value="GUEST">GUEST</option>
              </select>
            </p>
            <p>Created At: {user.createdAt}</p>
            <p>Updated At: {user.updatedAt}</p>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Update</button>
          </form>
        </div>
      </div>
    //   <div>
    //   <h1>User</h1>
    //   <form onSubmit={this.onSubmit}>
    //     <p>ID: {user._id}</p>
    //     <p>Email: {user.email}</p>
    //     <p>Role:
    //       <select value={role} name="role" onChange={this.onChange}>
    //         <option value="ADMIN">ADMIN</option>
    //         <option value="PERSONNEL">PERSONNEL</option>
    //         <option value="GUEST">GUEST</option>
    //       </select>
    //     </p>
    //     <p>Created At: {user.createdAt}</p>
    //     <p>Updated At: {user.updatedAt}</p>
    //     <button className="btn btn-lg btn-primary btn-block" type="submit">Update</button>
    //   </form>
    // </div>
    );
  }
}

export default UpdateIssue;
