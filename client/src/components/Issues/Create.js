import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      <div className="card">
          <div className="card-header card-header-primary">
              <h4 className="card-title">Create Issue</h4>
              <p className="card-category">Enter issue information</p>
          </div>
          <div className="card-body">
              <form onSubmit={this.onSubmit}>
                  <div className="row">
                      <div className="col-md-12">
                          <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" name="name" value={name} onChange={this.onChange} required/>
                          </div>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-12">
                          <div className="form-group">
                            <label>Description</label>
                            <input type="text" className="form-control" name ="description" value={description} onChange={this.onChange} required/>
                          </div>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-6">
                          <div className="form-group">
                            <label>Building</label>
                            <input type="text" className="form-control" name ="building" value={building} onChange={this.onChange} required/>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="form-group">
                            <label>Floor</label>
                            <input type="text" className="form-control" name ="floor" value={floor} onChange={this.onChange} required/>
                          </div>
                      </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Room</label>
                        <input type="text" className="form-control" name ="room" value={room} onChange={this.onChange} required/>
                      </div>
                    </div>
                    <div className="col-md-6">
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
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary pull-right">Submit</button>
                  </div>
                  <div className="clearfix"></div>
              </form>
          </div>
      </div>
    );
  }
}

export default CreateIssue;
