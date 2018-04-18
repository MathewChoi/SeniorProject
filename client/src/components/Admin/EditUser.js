import React, { Component } from 'react';
import axios from 'axios';

class EditUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // explicitly define the state variables so React 
      // doesn't think we're trying to control an uncontrolled component
      user: {}
    };
  }

  componentWillMount(){
    // populate state variables with the current values for the issue stored in the database
    const header = { headers: {"Authorization": localStorage.getItem('token')}};
    const id = this.props.match.params.id;
    axios.get('/api/users/'+id, header)
      .then(res => {
        this.setState({user: res.data}, () => {
          console.log(this.state);
        })
      })
      .catch(err => console.log(err));
  }
  
  onChange = (event) => {
    const state = this.state
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    
    alert(this.state.user.role);

  }

  render() {

    const user = this.state.user;

    return (
      <div>
        <h1>User</h1>
          <form  onSubmit={this.onSubmit}>
            <p>Id: {user._id}</p>
            <p>Email: {user.email}</p>
            <p>Role: &nbsp;
              <select value={user.role} onChange={this.onChange}>
                <option value="ADMIN">ADMIN</option>
                <option value="PERSONNEL">PERSONNEL</option>
                <option value="GUEST">GUEST</option>
              </select>
            </p>
            <p>Created At: {user.createdAt}</p>
            <p>Updated At: {user.updatedAt}</p>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
          </form>
      </div>
    );
  }
}

export default EditUser;

