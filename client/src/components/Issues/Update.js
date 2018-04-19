import React, { Component } from 'react';
import axios from 'axios';

class UpdateIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // explicitly define the state variables so React 
      // doesn't think we're trying to control an uncontrolled component
      name: '',
      description: '',
      building: '',
      floor: '',
      room: '',
      category: '',
      status: '',
    };
  }
  
  componentWillMount(){
    // populate state variables with the current values for the issue stored in the database
    const header = { headers: {"Authorization": localStorage.getItem('token')}};
    const id = this.props.match.params.id;
    axios.get('/api/issues/'+id, header)
      .then(res => {
        this.setState({name: res.data.name, description: res.data.description, building: res.data.building, floor: res.data.floor, room: res.data.room, category: res.data.category, status: res.data.status}, () => {
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
    let name = this.state.name;
    let description = this.state.description;
    let building = this.state.building;
    let floor = this.state.floor;
    let room = this.state.room;
    let category = this.state.category;
    let status = this.state.status;
    const header = { headers: {"Authorization": localStorage.getItem('token')}};
    const id = this.props.match.params.id;
    const data = { name, description, building, floor, room , category, status};

    axios.put('/api/issues/'+id, data, header)
    .then((res) => {
      this.props.history.push("/issues");
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    let name = this.state.name;
    let description = this.state.description;
    let building = this.state.building;
    let floor = this.state.floor;
    let room = this.state.room;
    let category = this.state.category;
    let status = this.state.status;
    const options = ['PLUMBING', 'ELECTRICAL', 'IT', 'STRUCTURAL', 'MECHANICAL', 'JANITORIAL', 'OTHER'];
    const statusOptions = ['OPEN', 'CLOSED', 'ASSIGNED', 'IN PROGRESS', 'ON HOLD'];
    return (
      <div>
        <form className="form-signin" onSubmit={this.onSubmit}>

          <h2 className="form-signin-heading">Update Issue</h2>
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
          <div className="form-group">
            <label>Category</label>
            <select className="form-control" name="status" value={status} onChange={this.onChange}>
              {statusOptions.map((option, i) => {
                return (
                  <option value={option} key={i}>{option}</option>
                )
              })}
            </select>
          </div>
          
          
          <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>

        </form>
      </div>
    );
  }
}

export default UpdateIssue;
