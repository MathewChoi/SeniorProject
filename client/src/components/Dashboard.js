import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: ''
    };
  }

  componentWillMount(){
    
    axios.get('/api/users/dashboard', { headers: {"Authorization": localStorage.getItem('token')}} )
    .then((res) => {
      console.log(res.data);
      this.setState({user: res.data});
    }).catch(err =>{
      console.log(err);
    });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <h1>It worked!</h1>
        <p>Email: {user.email}</p>
        <p>User ID: {user._id}</p>
        <p>Role: {user.role}</p>
      </div>
    );
  }
  
}

export default Dashboard;
