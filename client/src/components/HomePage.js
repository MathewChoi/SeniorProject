import React, { Component } from 'react';
import CreateAccountForm from './CreateAccountForm.js'
import Navbar from './Navbar';
import team_logo from './../resources/inSpect-logo.svg';
import './../stylesheets/HomePage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import 'bulma/css/bulma.css';

/*

<div className="c">
					<div className="row">
						<div className="red col-4">
							test1
						</div>
						<div className="green col-4">
							test2
						</div>
						<div className="blue col-4">
							test3
						</div>
					</div>
				</div>

*/

export default class LandingPage extends Component {
  render() {
		return (
			<div className="hp-page">
				<div className="columns">
					<div className="column is-two-fifths">
						<div className="hp-title">
							Welcome to FixBit.
						</div>
						<div className="hp-text">
							The #1 Facilities Management Software in the Pacific Southwest!
						</div>
					</div>
					<div className="column">
						<div className="green">test2</div>
					</div>
					<div className="column">
						<CreateAccountForm />
					</div>
				</div>
			</div>
		);
	}
}