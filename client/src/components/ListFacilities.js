import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/issues.css';

class ListFacilites extends Component {

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
          // console.log(this.state)
        })
      })
      .catch(err => console.log(err));
  } 

  render() {
    const facilityItems = this.state.facilities;
    return (
      <div>
        <h1>View Issues by Facility</h1>
        
        {facilityItems.map((facility, i) => {
          return (
            <div >
              <div className="facility-card" key={i}>
                <Link to={`/issues/facility-issues/${facility.name}`} >
                  {facility.name}
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}

export default ListFacilites;