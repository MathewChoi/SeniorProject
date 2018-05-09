import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../Helpers/Authentication';

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
          
          // If user is admin redirect to admin dashboard else redirect to issues page
          
          const pathname = Auth.isAdmin() === true ? '/admin/dashboard' : '/dashboard';

          this.props.history
          .push({
            pathname,
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
        <div className="row">
          <div className="col-md-6 mx-auto">
              <div className="card">
                  <div className="card-header card-header-primary">
                      <h4 className="card-title">User Login</h4>
                      <p className="card-category">Enter profile information</p>
                  </div>
                  <div className="card-body">
                      <form onSubmit={this.onSubmit}>
                          
                          <div className="row">
                              <div className="col-md-12">
                                  <div className="form-group">
                                    <label>Email address</label>
                                    <input type="email" className="form-control" name="email" value={email} onChange={this.onChange} required placeholder="Enter email" />
                                  </div>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col-md-12">
                                  <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" name ="password" value={password} onChange={this.onChange} required placeholder="Password" />
                                  </div>
                              </div>
                          </div>
                          <div className="text-center">
                            <button type="submit" className="btn btn-primary pull-right">Login</button>
                            <br/>
                            <small>Don't have an account? <Link to="/signup">Register</Link></small>
                          </div>
                          <div className="clearfix"></div>
                      </form>
                  </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;