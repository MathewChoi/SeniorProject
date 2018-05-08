import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Auth from './Helpers/Authentication';


class MaterialNavBar extends Component {
  
  
  toggle() {
    var toggler = document.getElementsByClassName("navbar-toggler")[0];
    toggler.classList.toggle("toggled");
    var root = document.documentElement;
    root.classList.toggle('nav-open');
  }
  
  render() {
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
