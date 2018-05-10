import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../Helpers/Authentication';
import axios from 'axios';
import '../../styles/issues.css';
var moment = require('moment');

class FacilityIssues extends Component {

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
      },
      issues: [],
      query:''
    }
    this.onChange = this.onChange.bind(this);
  }

  async componentWillMount(){
    await this.getFacility();
    // this.getIssues();
    // this.setState({facilityName: this.props.match.facility});
  }

  async getFacility(callback){
    axios.get('/api/facilities/'+this.props.match.params.id)
      .then(res => {
        this.setState({facility: res.data}, () =>{
          this.getIssues();
        })
      })
      .catch(err => console.log(err));
  }

  getIssues(){
    // axios.get('/api/issues/facility-issues/'+this.props.match.params.facility+'?sort=createdAt&order=-1')//+ this.props.match.params.facility)
    axios.get('/api/issues/facility-issues/'+this.state.facility.name+'?sort=createdAt&order=-1')//+ this.props.match.params.facility) 
      .then(res => {
        this.setState({issues: res.data}, () =>{
          // console.log("Issues  = ");
          // console.log(this.state)
        })
      })
      .catch(err => console.log(err));
  } 

  onChange (e){
      console.log(e.target.value);
    this.setState({query: e.target.value});
    // axios.get('/api/issues/facility-issues/'+this.props.match.params.facility+e.target.value)//+ this.props.match.params.facility)
    axios.get('/api/issues/facility-issues/'+this.state.facility.name+e.target.value)//+ this.props.match.params.facility)    
      .then(res => {
        this.setState({issues: res.data}, () =>{
          // console.log(this.state)
        })
      })
      .catch(err => console.log(err));
  }
  onDelete(id){
    if (window.confirm("Are you sure?")) {
      axios.delete('/api/issues/'+id)
      .then((result) => {
        window.location.reload();
      });
    } 
  }
  
  render() {
    const {facility} = this.state;
    const issueItems = this.state.issues;
    const url= window.location.pathname.split('/');
    return (
      <div className="card">
        <div className="card-header card-header-primary">
            {/* <h1 className="card-title ">{this.props.match.params.facility}</h1> */}
            <h1 className="card-title ">{facility.name}</h1>            
        </div>
        <div className="card-body">
        {auth.isAdmin() ? <Link className="btn btn-outline-primary" to={`/facilities/update/${facility._id}`}>Add Floor</Link>:<div></div>}          
          {/* <button onClick={this.onDelete.bind(this, this.state.facility._id)} className="btn btn-outline-danger">Delete</button> */}
            <div className="table-responsive">
                <table className="table">
                    <thead className=" text-primary">
                        <th>
                        Floor   
                        </th>
                        <th>
                        Rooms
                        </th>
                    </thead>
                    <tbody>
                    {facility.floors.map((floor, i) => {
                      const rooms = floor.rooms;
                      let roomstr = "";
                      rooms.map((room, i) => {
                        roomstr += room.name + ", ";
                      });
                      roomstr = roomstr.substr(0, roomstr.length-2);
                return (
                  <tr key={i}>
                    <td>{floor.floorNumber}</td>
                    <td>{roomstr}</td>
                  </tr>
                )
              })}
                        
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="card-body">
          <select className="form-control" value={this.state.query} onChange={this.onChange}> 
            <option>Sort Issues by...</option>
            <option value='?sort=createdAt&order=-1'>Sort by recently reported</option>
            <option value='?sort=createdAt&order=1'>Sort by earliest reported</option>
            <option value='?sort=name&order=1'>Sort by issues in alphabetical order (A-Z)</option>
            <option value='?sort=name&order=-1'>Sort by issues in alphabetical order (Z-A)</option>
            <option value='?sort=floor&order=1'>Sort by floor (LOW to HIGH)</option>
            <option value='?sort=floor&order=-1'>Sort by floor(HIGH to LOW)</option>
          </select>
            <div className="table-responsive">
                <table className="table">
                    <thead className=" text-primary">
                        <th>
                            Issue Name   
                        </th>
                        <th>
                            Description
                        </th>
                        <th>
                            Building
                        </th>
                        <th >
                            Floor
                        </th>
                        <th>
                            Room
                        </th>
                        <th>
                            Category
                        </th>
                        {/* <th>
                          Date Created
                        </th> */}
                    </thead>
                    <tbody>
                    {issueItems.map((issue, i) => {
                      var createdAt = moment(issue.createdAt).format('MM-DD-YYYY h:mm:ss a');
                return (
                  <tr key={i}>
                    <td>{issue.name}</td>
                    <td>{issue.description}</td>
                    <td>{issue.building}</td>
                    <td>{issue.floor}</td>
                    <td>{issue.room}</td>
                    <td>{issue.category}</td>
                    {/* <td>{createdAt}</td> */}
                    <td className="td-actions">
                      <button className="btn btn-primary btn-link btn-sm" onClick={()=>{this.props.history.push(`/issues/${issue._id}`);}}><i className="material-icons">search</i></button>
                      { (auth.getUser() === issue.creator || auth.isAdmin()) && <button className="btn btn-primary btn-link btn-sm" onClick={()=>{this.props.history.push(`/issues/update/${issue._id}`);}}><i className="material-icons">mode_edit</i></button> } &nbsp;
                      { (auth.getUser() === issue.creator || auth.isAdmin()) && <button className="btn btn-danger btn-link btn-sm" onClick={this.onDelete.bind(this, issue._id)}><i className="material-icons">close</i></button> }
                      
                    </td>
                  </tr>
                )
              })}
                        
              </tbody>
            </table>
          </div>
        </div>

      </div>
      
    );
  }
}

export default FacilityIssues;