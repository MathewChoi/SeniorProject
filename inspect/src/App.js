import React, { Component } from 'react';
import CreateAccountForm from './CreateAccountForm.js'
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
				<CreateAccountForm />
			</div>
		);
	}
}

export default App;
export {CreateAccount};
