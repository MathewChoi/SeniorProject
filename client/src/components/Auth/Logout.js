import React, { Component } from 'react';

class Logout extends Component {

  componentWillMount(){
    localStorage.removeItem('token');
    this.props.history.push("/login");
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Logout;
