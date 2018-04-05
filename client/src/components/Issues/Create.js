import React, { Component } from 'react';
import axios from 'axios';

class CreateIssue extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      building: '',
      floor: '',
      room: '',
    };
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { name, description, building, floor, room } = this.state;

    axios.get('/api/users/newIssue',
    { headers: {
      "Authorization": localStorage.getItem('token'),
      name, description, building, floor, room
    }})
    .then((res) => {
      console.log(res);
    });
  }

  render() {
    const { name, description, building, floor, room } = this.state;
    return (
      <div>
        <form className="form-signin" onSubmit={this.onSubmit}>

          <h2 className="form-signin-heading">Create Issue</h2>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" name="name" value={name} onChange={this.onChange} required placeholder="name" />
          </div>
          <div className="form-group">
            <label>description</label>
            <input type="text" className="form-control" name="description" value={description} onChange={this.onChange} required placeholder="description" />
          </div>
          <div className="form-group">
            <label>building</label>
            <input type="text" className="form-control" name="building" value={building} onChange={this.onChange} required placeholder="building" />
          </div>
          <div className="form-group">
            <label>floor</label>
            <input type="text" className="form-control" name="floor" value={floor} onChange={this.onChange} required placeholder="floor" />
          </div>
          <div className="form-group">
            <label>room</label>
            <input type="text" className="form-control" name="room" value={room} onChange={this.onChange} required placeholder="room" />
          </div>
          
          <button className="btn btn-lg btn-primary btn-block" type="submit">Create</button>

        </form>
      </div>
    );
  }
}

export default CreateIssue;
