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
  onDelete(id){
    if (window.confirm("Are you sure?")) {
      axios.delete('/api/issues/'+id)
      .then((result) => {
        window.location.reload();
      });
    } 
  }
  
  render() {
    const issueItems = this.state.issues;
    const url= window.location.pathname.split('/');
    return (
      <div className="card" style={{width:'890px'}}>
        <div className="card-header card-header-primary">
            <h1 className="card-title ">{url[3]}</h1>
        </div>
        <div className="card-body">
          <select className="form-control" value={this.state.query} onChange={this.onChange}> 
            <option>Sort by...</option>
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
                        <th>
                          Date Created
                        </th>
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
                    <td>{createdAt}</td>
                    <td>
                      <button className="fa fa-eye" onClick={()=>{this.props.history.push(`/issues/${issue._id}`);}} />
                      { (auth.getUser() === issue.creator || auth.isAdmin()) && <button className="fa fa-pencil" onClick={()=>{this.props.history.push(`/issues/update/${issue._id}`);}} /> } &nbsp;
                      { (auth.getUser() === issue.creator || auth.isAdmin()) && <button className="fa fa-trash" onClick={this.onDelete.bind(this, issue._id)} /> }
                      
                      
                      
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