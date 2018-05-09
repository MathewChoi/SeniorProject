import React, { Component } from 'react';
import axios from 'axios';

class AddFloor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      facility: {},
      floorNumber:'',
      rooms:''
    };
  }

  toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const state = this.state;

    if (name === 'rooms') {
      state[name] = this.toTitleCase(value);
    } else {
      state[name] = value;
    }
    
    this.setState(state);
  }
  
  
  onSubmit = (e) => {
    console.log("The current state");
    console.log(this.state);
    
    e.preventDefault();
    const id = this.props.match.params.id;
    const { floorNumber, rooms } = this.state;
    const header = { headers: {"Authorization": localStorage.getItem('token')}};
    const data = { floorNumber, rooms };


    axios.post('/api/facilities/'+id, data, header)
    .then((res) => {
      this.props.history.push("/facilities");
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    const { floorNumber, rooms } = this.state;
    return (
      <div>
        <form className="form-signin" onSubmit={this.onSubmit}>

          <h2 className="form-signin-heading">Add a Floor</h2>
          <div className="form-group">
            <label>Floor</label>
            <input type="text" className="form-control" name="floorNumber" value={floorNumber} onChange={this.onChange} required placeholder="floor number" />
          </div>
          <div className="form-group">
            <label>Rooms</label>
            <input type="text" className="form-control" name="rooms" value={rooms} onChange={this.onChange} required placeholder="rooms" />
          </div>      
          
          <button className="btn btn-lg btn-primary btn-block" type="submit">Create</button>

        </form>
      </div>
    );
  }
}

export default AddFloor;
