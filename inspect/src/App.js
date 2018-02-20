import React, { Component } from 'react';
import logo from './logo.svg';
import team_logo from './inSpect-logo.svg';
import './App.css';
import './CreateAccount.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

class CreateAccount extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: props.email,
			username: props.username,
			password: props.password
		};
	}
	
	render() {
		return (
			<div className="ca-container">
				<img src={team_logo} className="ca-logo" alt="logo" />
				<div className="ca-form">
					<div className="ca-form-header">EMAIL</div>
					<input id="email" className="ca-form-input" type="text"/>
					<div className="ca-form-header">USERNAME</div>
					<input id="username" className="ca-form-input" type="text"/>
					<div className="ca-form-header">PASSWORD</div>
					<input id="password" className="ca-form-input" type="text" />
					<input id="submit" className="ca-form-submit" type="button" value="Register" />
				</div>
			</div>
		);
	}
}

export default App;
export {CreateAccount};
