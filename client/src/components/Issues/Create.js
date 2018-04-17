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
      category: 'PLUMBING',
    };
  }

  toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const state = this.state;
    if (name === 'name' || name === 'room') {
      state[name] = this.toTitleCase(value);
    } else {
      state[name] = value;
    }
    this.setState(state);
  }
  
  
  onSubmit = (e) => {
    e.preventDefault();
    const { name, description, building, floor, room, category } = this.state;
    const header = { headers: {"Authorization": localStorage.getItem('token')}};
    const data = { name, description, building, floor, room , category}

    axios.post('/api/issues', data, header)
    .then((res) => {
      this.props.history.push("/issues");
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    const { name, description, building, floor, room, category } = this.state;
    const options = ['PLUMBING', 'ELECTRICAL', 'IT', 'STRUCTURAL', 'MECHANICAL', 'JANITORIAL', 'OTHER'];
    return (
      <div>
        <form className="form-signin" onSubmit={this.onSubmit}>

          <h2 className="form-signin-heading">Report Issue</h2>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" name="name" value={name} onChange={this.onChange} required placeholder="name" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input type="text" className="form-control" name="description" value={description} onChange={this.onChange} required placeholder="description" />
          </div>
          <div className="form-group">
            <label>Building</label>
            <input type="text" className="form-control" name="building" value={building} onChange={this.onChange} required placeholder="building" />
          </div>
          <div className="form-group">
            <label>Floor</label>
            <input type="text" className="form-control" name="floor" value={floor} onChange={this.onChange} required placeholder="floor" />
          </div>
          <div className="form-group">
            <label>Room</label>
            <input type="text" className="form-control" name="room" value={room} onChange={this.onChange} required placeholder="room" />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select className="form-control" name="category" value={category} onChange={this.onChange}>
              {options.map((option, i) => {
                return (
                  <option value={option} key={i}>{option}</option>
                )
              })}
            </select>
          </div>
          
          
          <button className="btn btn-lg btn-primary btn-block" type="submit">Create</button>

        </form>
      </div>
    );
  }
}

export default CreateIssue;
