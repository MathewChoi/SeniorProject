import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
  render() {
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
