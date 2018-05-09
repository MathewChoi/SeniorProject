import React, { Component } from 'react';
import axios from 'axios';
import Auth from '../Helpers/Authentication';

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
<<<<<<< HEAD
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
=======
      category: '',
      status: '',
>>>>>>> 1f1cd0c55aae4bb4ba46e941a9bac8ef5d4551bd
    };
  }
  
componentWillMount() {
    // populate state variables with the current values for the issue stored in the database
    const header = { headers: {"Authorization": localStorage.getItem('token')}};
    const id = this.props.match.params.id;
    
    axios.get('/api/issues/'+id, header)
<<<<<<< HEAD
      .then(res => { 
          this.setState({name: res.data.name, description: res.data.description, building: res.data.building, floor: res.data.floor, room: res.data.room, category: res.data.category}, () => {
        })        
=======
      .then(res => {
        this.setState({name: res.data.name, description: res.data.description, building: res.data.building, floor: res.data.floor, room: res.data.room, category: res.data.category, status: res.data.status}, () => {
          console.log(this.state);
        })
>>>>>>> 1f1cd0c55aae4bb4ba46e941a9bac8ef5d4551bd
      })
      .catch(err => console.log(err));

  }

  async componentDidMount() {
    // performs other api calls needed to populate the state variables the state
    this.getFacilities(() => {
      const {facilities} = this.state;
      const building = this.state.building;
      const floor = this.state.floor;
      let floorlist = this.getFloors(building);
      let roomlist = this.getRooms(building, floor);
      this.setState({floors:floorlist, rooms:roomlist}, () => {
        console.log(this.state);          
      });
      this.render();
    });
   
  }

 async getFacilities(callback)  {
    axios.get('/api/facilities')
      .then(res => {
        this.state['facilities'] = res.data;  
        console.log("Updated the list of facilities");        
        console.log(this.state['facilities']);
        callback();
      }
      ).catch(err => console.log(err));
  }

  getFloors = (facilityname) => {
    const facilities = this.state.facilities;
    console.log("Current value of facilities");
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
    const state = this.state;
    // apply title capitalization
    if (name==='name') {
      state[name] = this.toTitleCase(event.target.value);
    } else if (name === 'building'){
      state['floors'] = this.getFloors(value);
      state[name] = value;
      state['room'] = '';
    } else if (name === 'floor'){
      state['rooms'] = this.getRooms(state['building'], value);
      state[name] = value;
    } else {
      state[name] = event.target.value;
    }
    this.setState(state);
  }
  
  toTitleCase = (str) => {
    // replaces each word (alphanumeric followed by a spaces) with it title capitalization
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
  
  
  onSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    const { name, description, building, floor, room, category } = this.state;
=======
    let name = this.state.name;
    let description = this.state.description;
    let building = this.state.building;
    let floor = this.state.floor;
    let room = this.state.room;
    let category = this.state.category;
    let status = this.state.status;
>>>>>>> 1f1cd0c55aae4bb4ba46e941a9bac8ef5d4551bd
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
<<<<<<< HEAD
    let { name, description, building, floor, room, category, facilities, floors, rooms} = this.state;
    const options = ['PLUMBING', 'ELECTRICAL', 'IT', 'STRUCTURAL', 'MECHANICAL', 'JANITORIAL', 'OTHER'];
    const floorlist = floors.map(floor => floor.floorNumber);
    const roomlist = rooms.map(room => room.name);
=======
    let name = this.state.name;
    let description = this.state.description;
    let building = this.state.building;
    let floor = this.state.floor;
    let room = this.state.room;
    let category = this.state.category;
    let status = this.state.status;
    const options = ['PLUMBING', 'ELECTRICAL', 'IT', 'STRUCTURAL', 'MECHANICAL', 'JANITORIAL', 'OTHER'];
    const statusOptions = ['OPEN', 'CLOSED', 'ASSIGNED', 'IN PROGRESS', 'ON HOLD'];
    const isAdmin = Auth.isAdmin();

>>>>>>> 1f1cd0c55aae4bb4ba46e941a9bac8ef5d4551bd
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
                )
              })}
            </select>
          </div>
          { isAdmin && 
            <div className="form-group">
              <label>Status</label>
              <select className="form-control" name="status" value={status} onChange={this.onChange}>
                {statusOptions.map((option, i) => {
                  return (
                    <option value={option} key={i}>{option}</option>
                  )
                })}
              </select>
            </div>
          }
          
          <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>

        </form>
      </div>
    );
  }
}

export default UpdateIssue;
