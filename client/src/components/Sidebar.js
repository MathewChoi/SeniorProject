import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavLink from './Helpers/NavLink';
import Auth from './Helpers/Authentication';
import '../styles/sidebar.css';

class Sidebar extends Component {

  toggle() {
    var toggler = document.getElementsByClassName("navbar-toggler")[0];
    toggler.classList.remove("toggled");
    var root = document.documentElement;
    root.classList.remove('nav-open');
  }

  render() {

    const signin = Auth.isAuthenticated() ? (
      <div className="nav-item active-pro">
        <NavLink onClick={this.toggle.bind(this)} to="/logout">
          <i className="material-icons">person</i>
          <p>Logout</p>
        </NavLink>
      </div> ) : (
      <div className="nav-item active-pro">
        <NavLink onClick={this.toggle.bind(this)} to="/login">
          <i className="material-icons">person</i>
          <p>Login</p>
        </NavLink>
        <NavLink onClick={this.toggle.bind(this)} to="/signup">
            <i className="material-icons">person</i>
            <p>Register</p>
        </NavLink>
      </div>);

    return (
      <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
        <div className="logo">
            <Link onClick={this.toggle.bind(this)} to="/" className="simple-text logo-normal">
              <i className="material-icons">build</i> Fixbit
            </Link>
        </div>
        <div className="sidebar-wrapper">
            <ul className="nav">
              
              <NavLink onClick={this.toggle.bind(this)} to={ Auth.isAdmin() ? "/admin/dashboard" : "/dashboard"}>
                <i className="material-icons">dashboard</i>
                <p>Dashboard</p>
              </NavLink>
              <div className="sidebar-collapse">
                <div href="#issueMenu"  data-toggle="collapse" aria-expanded="false">
                  <i className="material-icons">error_outline</i>
                    Issues  
                </div>
              </div>
              <div className="collapsed" id="issueMenu">
                <NavLink onClick={this.toggle.bind(this)} to="/issues">
                  <i className="material-icons">remove_red_eye</i>
                  <p>View All Issues</p>
                </NavLink>

                <NavLink onClick={this.toggle.bind(this)} to="/facilities">
                  <i className="material-icons">remove_red_eye</i>
                  <p>View Issues By Facility</p>
                </NavLink>

                <NavLink onClick={this.toggle.bind(this)} to="/issues/create">
                  <i className="material-icons">mode_edit</i>
                  <p>Report Issue</p>
                </NavLink>
                
              </div>
              { Auth.isAdmin() ?
                <div>
                  <div className="sidebar-collapse">
                    <div href="#facilitiesMenu"  data-toggle="collapse" aria-expanded="false">
                      <i className="material-icons">home</i>
                        Facilities  
                    </div>
                  </div>

                  <div className="collapsed" id="facilitiesMenu">
                    <NavLink onClick={this.toggle.bind(this)} to="/facilities">
                      <i className="material-icons">home</i>
                      <p>Facilities</p>
                    </NavLink>
                    <NavLink onClick={this.toggle.bind(this)} to="/facilities/create">
                      <i className="material-icons">add</i>
                      <p>Add a Facility</p>
                    </NavLink>
                  </div>
                 
                </div> :
              <div></div>}
              <div>
                { signin }
              </div>
            </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;