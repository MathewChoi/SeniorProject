import React, { Component } from 'react';
import './../stylesheets/CreateAccountForm.css';

/*
<div className="ca-form-title">Register today!</div>
*/

export default class CreateAccountForm extends Component {
  render() {
		return (
			<div className="ca-form">
				<div className="ca-form-header">EMAIL</div>
				<input id="email" className="ca-form-input" type="text"/>
				<div className="ca-form-header">USERNAME</div>
				<input id="username" className="ca-form-input" type="text"/>
				<div className="ca-form-header">PASSWORD</div>
				<input id="password" className="ca-form-input" type="text" />
				<div className="ca-form-header">CONFIRM PASSWORD</div>
				<input id="password" className="ca-form-input" type="text" />
				<input id="submit" className="ca-form-submit" type="button" value="Register" />
			</div>
		);
	}
}