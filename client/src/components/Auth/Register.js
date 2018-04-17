import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {

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

    axios.post('/api/users', { email, password })
      .then((res) => {

        if (res.error) {
          console.log(res.error);
        }else{
          this.props.history.push("/login");
        }
        
      });
  }

  render() {
    const { email, password, message } = this.state;
    return (
      <div className="container">
        { message &&
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        }
        <form className="form-signin" onSubmit={this.onSubmit}>
          <h2 className="form-signin-heading">Register</h2>
          <div className="form-group">
            <label >Email address</label>
            <input type="email" className="form-control" name="email" value={email} onChange={this.onChange} required aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label >Password</label>
            <input type="password" className="form-control" name ="password" value={password} onChange={this.onChange} required placeholder="Password" />
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        
        </form>
      </div>
    );
  }
}

export default Register;