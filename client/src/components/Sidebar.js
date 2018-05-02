import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavLink from './Helpers/NavLink';

class Sidebar extends Component {

  render() {
    return (
      <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
        <div className="logo">
            <Link to="/" className="simple-text logo-normal">
              <i className="material-icons">build</i> Fixbit
            </Link>
        </div>
        <div className="sidebar-wrapper">
            <ul className="nav">
              <NavLink to="/login">
                <i className="material-icons">person</i>
                <p>Login</p>
              </NavLink>
              <NavLink to="/admin/dashboard">
                <i className="material-icons">dashboard</i>
                <p>Dashboard</p>
              </NavLink>
              <NavLink to="/issues">
                <i className="material-icons">error_outline</i>
                <p>Issues</p>
              </NavLink>
              <NavLink to="/facilities">
                <i className="material-icons">home</i>
                <p>facilities</p>
              </NavLink>
              <NavLink to="/issues/create">
                <i className="material-icons">mode_edit</i>
                <p>Report Issue</p>
              </NavLink>
            </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
