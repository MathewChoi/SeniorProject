import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: ''
    };
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    axios.post('/api/users/auth', { email, password })
      .then((res) => {

        if (!res.data.success) {
          this.setState({ message: res.data.message});
        } else {
          
          localStorage.setItem('token', "Bearer " + res.data.token);
          
          this.props.history
          .push({
            pathname: '/dashboard',
            state: { message: res.data.message }
          });

        }

        
      });
  }

  render() {
    const { email, password, message } = this.state;
    return (
      <div>
        { message &&
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        }
        <form className="form-signin" onSubmit={this.onSubmit}>
          <h2 className="form-signin-heading">Login</h2>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" name="email" value={email} onChange={this.onChange} required placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" name ="password" value={password} onChange={this.onChange} required placeholder="Password" />
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
          <div className="text-center">
            <small>Don't have an account? <Link to="/signup">Register</Link></small>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;