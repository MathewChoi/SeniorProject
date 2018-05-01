import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from './Helpers/Authentication';

class Sidebar extends Component {
  render() {
    const navButtons = Auth.isAuthenticated() ? (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 className="my-0 mr-md-auto font-weight-normal"><Link className="p-2 text-dark" to="/">Fixbit</Link></h5>
        <nav className="my-2 my-md-0 mr-md-3">
          <Link className="p-2 text-dark" to="/issues">Issues</Link>
          <Link className="p-2 text-dark" to="/facilities">Issues by Facility</Link>
          <Link className="p-2 text-dark" to="/issues/create">Report Issue</Link>
          <Link className="p-2 text-dark" to="/about">About</Link>
          <Link className="p-2 text-dark" to="/dashboard">Dashboard</Link>
          
          {/* <Link className="p-2 text-dark" to="/facilities">View Facilities</Link>           */}
          <Link className="p-2 text-dark" to="/facilities/create">Add a Facility</Link>
        
        </nav>
        <Link className="btn btn-outline-primary" to="/logout">Sign out</Link>
      </div>
    ) : (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 className="my-0 mr-md-auto font-weight-normal"><Link className="p-2 text-dark" to="/">Fixbit</Link></h5>
        <nav className="my-2 my-md-0 mr-md-3">
          <Link className="p-2 text-dark" to="/issues">Issues</Link>
          <Link className="p-2 text-dark" to="/about">About</Link>
        </nav>
        <Link className="btn btn-outline-primary" to="/login">Sign in</Link>
      </div>
    );
    return (
      <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
            
            <div className="logo">
                <Link to="/" className="simple-text logo-normal">
                    Fixbit
                </Link>
            </div>
            <div className="sidebar-wrapper">
                <ul className="nav">
                    <li className="nav-item active ">
                        <Link className="nav-link" to="/admin/dashboard">
                            <p>Dashboard</p>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link className="nav-link" to="/issues">
                            <p>Issues</p>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link className="nav-link" to="/facilities">
                            <p>facilities</p>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link className="nav-link" to="/issues/create">
                            <p>Report Issue</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
  }
}

export default Sidebar;
