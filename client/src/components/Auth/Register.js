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
                      <h4 className="card-title">User Registration</h4>
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
                            <button type="submit" className="btn btn-primary pull-right">Register</button>
                            <br/>
                            {/* <small>Don't have an account? <Link to="/signup">Register</Link></small> */}
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

export default Register;