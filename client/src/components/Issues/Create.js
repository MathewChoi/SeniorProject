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
      facilities: [{
        name:'',
        floors:[{
          floorNumber:'',
          rooms:[{
            name:'',
            isOpen: true
          }]
        }]
      }],
      floors:[],
      rooms:[]
    };
  }

  async componentWillMount(){
    await this.getFacilities();
  }


  toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  getFirstBuildingName = () => {
    const facilities = this.state.facilities;
    if (facilities !== undefined)
    {
      if (facilities.length > 0){
        return facilities[0].name;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  async getFacilities() {
    axios.get('/api/facilities')
      .then(res => {
        this.setState({facilities: res.data}, () =>{
        })
      })
      .catch(err => console.log(err));
  }

  getFloors = (facilityname) => {
    const facilities = this.state.facilities;
    console.log(facilities);
    if (facilities !== undefined){
      const facility = facilities.find(facility => facility.name === facilityname);
      if (facility !== undefined){
        return facility.floors;
      }
    }
    return [];
  }

  getRooms = (facilityName, floorNumber) => {
    console.log("Inside getRooms()");
    const facilities = this.state.facilities;
    if (facilities !== undefined){
      const floors = this.getFloors(facilityName);
      if (floors !== undefined){
        const floor = floors.find(floor => floor.floorNumber === floorNumber);
        if (floor !== undefined){
          return floor.rooms;
        }
      }
    }    
    return []
  }

  onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const state = this.state;
    if (name === 'name' || name === 'room') { // apple title case
      state[name] = this.toTitleCase(value);
    } else if (name === 'building') { // update the floors
      state['floors'] = this.getFloors(value);
      state[name] = value;
      state['room'] = '';
    } else if (name === 'floor') {
      state['rooms'] = this.getRooms(state['building'], value);
      state[name] = value;
    } else {
      state[name] = value;
    }
    this.setState(state);
    console.log(this.state);
  }
  
  
  onSubmit = (e) => {
    e.preventDefault();
    const { name, description, building, floor, room, category } = this.state;
    if (building === '' || floor === '' || room === '') return
    
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
    const { name, description, building, floor, room, category, facilities, floors, rooms} = this.state;
    const options = ['PLUMBING', 'ELECTRICAL', 'IT', 'STRUCTURAL', 'MECHANICAL', 'JANITORIAL', 'OTHER'];
    // facilities.unshift('Select an Option');
    const floorlist = floors.map(floor => floor.floorNumber);
    // floorlist.unshift('Select an Option');
    const roomlist = rooms.map(room => room.name);
    // roomlist.unshift('Select an Option');
    console.log(`floorlist = ${floorlist}`);
    console.log(`roomlist = ${roomlist}`); 
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
            <select className="form-control" name="building" value={building} onChange={this.onChange} required="true">
              {
               (facilities !== undefined) ?
               (facilities.map((facility,i) => {
                const facilityname = facility.name;
                return (
                  <option value={facilityname} key={i}>{facilityname}</option>
                  ); 
                }))
                :
                (console.log("No facilities are recorded.")
              )}
            </select>
          </div>
          <div className="form-group">
            <label>Floor</label>
            <select className="form-control" name="floor" value={floor} onChange={this.onChange} required placeholder="required">
              {floorlist.map((option, i) => {
                  return (
                    <option value={option} key={i}>{option}</option>
                  );
                })}
            </select>
          </div>
          <div className="form-group">
            <label>Room</label>
            <select className="form-control" name="room" value={room} onChange={this.onChange} required placeholder="required">
              {roomlist.map((option, i) => {
                return (
                  <option value={option} key={i}>{option}</option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Category</label>
            <select className="form-control" name="category" value={category} onChange={this.onChange}>
              {options.map((option, i) => {
                return (
                  <option value={option} key={i}>{option}</option>
                );
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
