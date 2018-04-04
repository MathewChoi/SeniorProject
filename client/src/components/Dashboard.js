import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  componentWillMount(){
    axios.get('/api/users/dashboard',
    { headers: {
      "Authorization": localStorage.getItem('token')
      }
    })
    .then((res) => {
      this.setState({message: res.data});
    });
  }

  render() {
    const { message } = this.state;
    return (
      <div>
        <h1>{message}</h1>
        <p>Your JWT Token: {localStorage.getItem('token')}</p>
        { !localStorage.getItem('token') && <h1>Not authorized</h1>}
      </div>
    );
  }
  
}

export default Dashboard;
