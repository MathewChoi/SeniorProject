import React, { Component } from 'react';
//import NavBar from 'semantic-ui-react';
import team_logo from './inSpect-logo.svg';
import 'semantic-ui-css/semantic.min.css';
import './NavBar.css';
/*<img src={team_logo} className="ca-logo" alt="logo" />*/
export default class NavBar extends Component {
	render() {
		return (
			<div className="ui menu">
				<div className="header item">
					FixBit
				</div>
				<a className="item active">
					Landing Page
				</a>
				<a className="item">
					Create Account
				</a>
			</div>
		);
	}
}