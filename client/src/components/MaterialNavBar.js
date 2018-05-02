import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MaterialNavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top">
        <div className="container-fluid">
            <div className="navbar-wrapper">
                {/* <a className="navbar-brand" href="#pablo">Material Dashboard</a> */}
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                <span className="sr-only">Toggle navigation</span>
                <span className="navbar-toggler-icon icon-bar"></span>
                <span className="navbar-toggler-icon icon-bar"></span>
                <span className="navbar-toggler-icon icon-bar"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navigation">
                {/* <ul className="navbar-nav">
                
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

                </ul> */}
            </div>
        </div>
      </nav>
    );
  }
}

export default MaterialNavBar;
