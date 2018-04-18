import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../stylesheets/SideNav.css';

class SideNav extends Component {

  constructor(props) {
    super(props);

    // this.toggle = this.toggle.bind(this);
    // this.state = {
    //   isOpen: false
    // };
  }

  // toggle() {
  //   this.setState({
  //     isOpen: !this.state.isOpen
  //   });
  // }

  render() {

    const button = localStorage.getItem('token') ? (
      <Link className="btn btn-outline-primary" to="/logout">Sign out</Link>
    ) : (
      <Link className="btn btn-outline-primary" to="/login">Sign in</Link>
    );

    return (
      <div className="ui vertical menu sn-vertical sn-ui">
        <div className="item">
          <img src={require("./../resources/square-image.png")} className="ui medium circular image sn-profile-icon"/>
        </div>
        <div className="item">
          <div className="header">Issues</div>
          <div className="menu">
            <a className="item">Posted by You</a>
            <a className="item">Posted by All</a>
            <a className="item">Newest</a>
            <a className="item">Post a New Issue</a>
          </div>
        </div>
        <div className="item">
          <div className="header">CMS Solutions</div>
          <div className="menu">
            <a className="item">Rails</a>
            <a className="item">Python</a>
            <a className="item">Php</a>
          </div>
        </div>
        <div className="item">
          <div className="header">Hosting</div>
          <div className="menu">
            <a className="item">Shared</a>
            <a className="item">Dedicated</a>
          </div>
        </div>
      </div>
    );
  }
}

export default SideNav;