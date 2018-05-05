import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from './Helpers/Authentication';


class MaterialNavBar extends Component {
  
  
  toggle() {
    var toggler = document.getElementsByClassName("navbar-toggler")[0];
    toggler.classList.toggle("toggled");
    var root = document.documentElement;
    root.classList.toggle('nav-open');
  }
  
  render() {
    const links = Auth.isAuthenticated() ? (
      <div className="collapse navbar-collapse justify-content-end" id="navigation">
        <ul className="navbar-nav">
        
            <li className="nav-item">
              <Link className="nav-link" to="/logout">
                Logout
              </Link>
            </li>

        </ul>
      </div>
    ) : (
      <div className="collapse navbar-collapse justify-content-end" id="navigation">
        <ul className="navbar-nav">
        
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              or
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            </li>

        </ul>
      </div>
    );
    return (
      <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top">
        <div className="container-fluid">
            <div className="navbar-wrapper">
            </div>
            <button className="navbar-toggler" onClick={this.toggle.bind(this)} type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                <span className="sr-only">Toggle navigation</span>
                <span className="navbar-toggler-icon icon-bar"></span>
                <span className="navbar-toggler-icon icon-bar"></span>
                <span className="navbar-toggler-icon icon-bar"></span>
            </button>
            {/* {links} */}
        </div>
      </nav>
    );
  }
}

export default MaterialNavBar;
