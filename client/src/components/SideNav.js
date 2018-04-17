import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bulma/css/bulma.css';

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

    const button = localStorage.getItem('token') ? (
      <Link className="btn btn-outline-primary" to="/logout">Sign out</Link>
    ) : (
      <Link className="btn btn-outline-primary" to="/login">Sign in</Link>
    );

    return (
        <div class="block">
            <aside class="menu">
                
            </aside>
        </div>
    );
  }
}

export default Navbar;