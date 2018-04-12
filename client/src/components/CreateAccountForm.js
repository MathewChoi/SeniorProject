import React, { Component } from 'react';
import './../stylesheets/CreateAccountForm.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './../stylesheets/simple-grid.css';

/*
<div className="ca-form-title">Register today!</div>
*/

export default class CreateAccountForm extends Component {
  
  render() {
		return (
			<form className="ca-form">
				<div className="ca-form-header">EMAIL</div>
				<input id="email" className="ca-form-input" type="text"/>
				<div className="ca-form-header">USERNAME</div>
				<input id="username" className="ca-form-input" type="text"/>
				<div className="ca-form-header">PASSWORD</div>
				<input id="password" className="ca-form-input" type="text" />
				<div className="ca-form-header">CONFIRM PASSWORD</div>
				<input id="password" className="ca-form-input" type="text" />
				<button id="submit" className="ca-form-submit" type="submit">Register</button>
				<div className="ca-form-text">Already have an account? <Link to="/Login">Login here</Link>!</div>
			</form>
		);
	}
}