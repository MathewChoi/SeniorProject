import React, { Component } from 'react';
import './../stylesheets/CreateAccountForm.css';
import axios from 'axios';
import {Router, Link} from 'react-router-dom';
import './../stylesheets/simple-grid.css';
import Redirect from 'react-router-dom/Redirect';

/*
<div className="ca-form-title">Register today!</div>
*/

export default class CreateAccountForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		console.log(this.state.email);
	}

	/*static contextTypes = {
		router: React.PropTypes.object
	}

	componentWillMount() {
		this.context.router.getCurrentPath().should.equal('/');
	}*/

	onChange = (e) => {
		const state = this.state
		console.log("NAME: ", e.target.name);
		state[e.target.name] = e.target.value;
		this.setState(state);
	}

	onSubmit = (e) => {
		e.preventDefault();
		const {email, password} = this.state;
		console.log("submitted: ", this.state.email, " ", this.state.password);
		axios.post('/api/users', {email, password}).then(
			(res) => {
				if(res.error) {
					console.log("Registration error: ", res.error);
				} else {
					this.props.history.push("/login");
					//<Redirect to='/login' />
					// this.context.router.push('/login');
				}
			}
		);
	}

	render() {
		//const {email, password, message} = this.state;
		return (
			<form className="ca-form" onSubmit={this.onSubmit}>
				<div className="ca-form-header">EMAIL</div>
				<input id="email" className="ca-form-input" type="email" name="email" value={this.state.email} onChange={this.onChange} />
				<div className="ca-form-header">USERNAME</div>
				<input id="username" className="ca-form-input" type="text"/>
				<div className="ca-form-header">PASSWORD</div>
				<input id="password" className="ca-form-input" type="password" />
				<div className="ca-form-header">CONFIRM PASSWORD</div>
				<input id="password" className="ca-form-input" name="password" type="password" value={this.state.password} onChange={this.onChange} />
				<button id="submit" className="ca-form-submit" type="submit">Register</button>
				<div className="ca-form-text">Already have an account? <Link to="/Login">Login here</Link>!</div>
			</form>
		);
	}
}