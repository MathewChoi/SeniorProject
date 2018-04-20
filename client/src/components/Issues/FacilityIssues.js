import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/issues.css';
class FacilityIssues extends Component {

  constructor(){
    super();
    this.state = {
      issues: [],
      query:''
    }
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

  onChange = (e) => {
    
  }
  
  render() {
    const issueItems = this.state.issues;
    const url= window.location.pathname.split('/');
    return (
      <div>
        <h1>{url[3]}</h1>

        <select className="form-control" value={query} onChange={this.onChange}>
              <option value='?sort=createdAt&order=-1'>Sort by recently reported</option>
              <option value='?sort=createdAt&order=1'>Sort by earliest reported</option>
              <option value='?sort=name&order=1'>Sort by issues in alphabetical order (A-Z)</option>
              <option value='?sort=name&order=-1'>Sort by issues in alphabetical order (Z-A)</option>
              <option value='?sort=floor&order=-1'>Sort by floor (LOW to HIGH)</option>
              <option value='?sort=floor&order=1'>Sort by floor(HIGH to LOW)</option>
            </select>




        {issueItems.map((issue, i) => {
          var date = new Date (String(issue.createdAt).substring(0,19));
          var time =String(issue.createdAt).substring(11,16);
          var dateCreated = (date.getMonth()+1)+"-" + (date.getDate()) + "-" +date.getFullYear() + "   " + time ;
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
              <p className="spacing">Created At: {dateCreated}</p>
        
            </div>
          )
        })}
      </div>
    );
  }
}

export default FacilityIssues;