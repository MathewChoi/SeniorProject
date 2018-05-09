import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/issues.css';
class Facilities extends Component {

  constructor(){
    super();
    this.state = {
      facilities: []
    }
  }

  componentWillMount(){
    this.getFacilities();
  }

  getFacilities(){
    axios.get('/api/facilities')
      .then(res => {
        this.setState({facilities: res.data}, () =>{
        })
      })
      .catch(err => console.log(err));
  } 

  render() {
    const facilityItems = this.state.facilities;
    return (
      <div>
        <h1>Facilities</h1>
        {facilityItems.map((facility, i) => {
          var date = new Date (String(facility.createdAt).substring(0,19));
          var time =String(facility.createdAt).substring(11,16);
          var dateCreated = (date.getMonth()+1)+"-" + (date.getDate()) + "-" +date.getFullYear() + "   " + time ;
          return (
            <div className="dark" key={i}>
              <Link to={`/facilities/${facility._id}`} className="title">
                {facility.name}
              </Link>
              {/* <p className="spacing" >Description: {facility.description}</p>
              <div className="location">
                <p className="spacing">Building: {facility.building}</p>
                <p className="spacing">Floor: {facility.floor}</p>
                <p className="spacing">Room: {facility.room}</p>
              </div>
              <p className="spacing">Category: {facility.category}</p>
              <p className="spacing">Status: {facility.status}</p>
              <p className="spacing">Created At: {dateCreated}</p> */}
        
            </div>
          )
        })}
      </div>
    );
  }

}

export default Facilities;