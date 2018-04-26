import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from './Helpers/Authentication';


class Navbar extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

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
      <div>
        {navButtons}
      </div>
    );
  }
}

export default Navbar;
