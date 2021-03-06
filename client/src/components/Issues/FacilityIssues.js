import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/issues.css';
var moment = require('moment');

class FacilityIssues extends Component {

  constructor(){
    super();
    this.state = {
      issues: [],
      query:''
    }
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount(){
    this.getIssues();
    this.setState({facilityName: this.props.match.facility});
  }

  getIssues(){
    axios.get('/api/issues/facility-issues/'+this.props.match.params.facility+'?sort=createdAt&order=-1')//+ this.props.match.params.facility)
      .then(res => {
        this.setState({issues: res.data}, () =>{
          // console.log(this.state)
        })
      })
      .catch(err => console.log(err));
  } 

  onChange (e){
      console.log(e.target.value);
    this.setState({query: e.target.value});
    axios.get('/api/issues/facility-issues/'+this.props.match.params.facility+e.target.value)//+ this.props.match.params.facility)
      .then(res => {
        this.setState({issues: res.data}, () =>{
          // console.log(this.state)
        })
      })
      .catch(err => console.log(err));
  }
  
  render() {
    const issueItems = this.state.issues;
    const url= window.location.pathname.split('/');
    return (
      <div>
        <h1>{url[3]}</h1>

        <select className="form-control" value={this.state.query} onChange={this.onChange}>
              <option value='?sort=createdAt&order=-1'>Sort by recently reported</option>
              <option value='?sort=createdAt&order=1'>Sort by earliest reported</option>
              <option value='?sort=name&order=1'>Sort by issues in alphabetical order (A-Z)</option>
              <option value='?sort=name&order=-1'>Sort by issues in alphabetical order (Z-A)</option>
              <option value='?sort=floor&order=1'>Sort by floor (LOW to HIGH)</option>
              <option value='?sort=floor&order=-1'>Sort by floor(HIGH to LOW)</option>
            </select>




        {issueItems.map((issue, i) => {
          var createdAt = moment(issue.createdAt).format('MM-DD-YYYY h:mm:ss a');
          
          return (
            <div className="dark" key={i}>
              <Link to={`/issues/${issue._id}`} className="title">
                {issue.name}
              </Link>
              <p className="spacing" >Description: {issue.description}</p>
              <div className="location">
                <p className="spacing">Building: {issue.building}</p>
                <p className="spacing">Floor: {issue.floor}</p>
                <p className="spacing">Room: {issue.room}</p>
              </div>
              <p className="spacing">Category: {issue.category}</p>
              <p className="spacing">Status: {issue.status}</p>
              <p className="spacing">Created At: {createdAt}</p>
        
            </div>
          )
        })}
      </div>
    );
  }
}

export default FacilityIssues;