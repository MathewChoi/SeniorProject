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
      this.setState({user: res.data});
    }).catch(err =>{
      console.log(err);
    });
  }

  render() {
    const { user } = this.state;
    const MONTH_NAMES = ["January ", "February ", "March ", "April ", "May ", "June ",
    "July ", "August ", "September ", "October ", "November ", "December "];

    const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return (
      <div>
        <h1>{DAY_NAMES[new Date().getDay()]}, {MONTH_NAMES[new Date().getMonth()]} {new Date().getDate()}, {new Date().getFullYear()}</h1>
        <p>Email: {user.email}</p>
        <p>User ID: {user._id}</p>
        <p>Role: {user.role}</p>
      </div>
    );
  }
  
}

export default Dashboard;
