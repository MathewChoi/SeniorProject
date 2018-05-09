import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ReadFacility extends Component {

  constructor(){
    super();
    this.state = {
      facility: {
          name:'',
          isOpen:'',
          floors:[{
              floorNumber:'',
              rooms:[{
                name:'',
                isOpen: true
            }]
          }]
      }
    }
  }

  componentWillMount(){
    this.getFacilities();
  }

  getFacilities(){
    axios.get('/api/facilities/'+this.props.match.params.id)
      .then(res => {
        this.setState({facility: res.data}, () =>{
        })
      })
      .catch(err => console.log(err));
  }

  onDelete(id){
    axios.delete('/api/facilities/'+id)
      .then((result) => {
        this.props.history.push("/facilities")
      });
  }

  render() {
    const facility = this.state.facility;
    const floors = this.state.facility.floors;
    return (
      <div>
        <h1>Facilities</h1>
          <p>Name: {facility.name}</p>
          <p>Is Open: {String(facility.isOpen)}</p>
          <p>Floor(s): </p> 
          <ul>
            {floors.map((floor, i) => {
                const rooms = floor.rooms;
                let roomstr = "";
                rooms.map((room, i) => {
                  // console.log(`room name = ${room.name}`);
                  roomstr += room.name + ", ";
                });
                return(<li><b>{floor.floorNumber}</b>: {roomstr.substr(0, roomstr.length-2)}</li>);                                              
            })}
          </ul> 
          {/* <Link className="btn btn-outline-primary" to={`update/${facility._id}`}>Edit</Link> */}
          <Link className="btn btn-outline-primary" to={`update/${facility._id}`}>Add Floor</Link>          
          <button onClick={this.onDelete.bind(this, this.state.facility._id)} className="btn btn-outline-danger">Delete</button>
      </div>
    );
  }
}

export default ReadFacility;