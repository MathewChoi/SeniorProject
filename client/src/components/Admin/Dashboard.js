import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      data: {},
    };
  }

  componentWillMount(){

    var d = new Date();
    var m = d.getMonth();
    var y = d.getFullYear();

    // Get issues for this month
    axios.get(`/api/issues/date/${m}/${y}`)
    .then((res)=>{
      this.setState({data: res.data});
      this.setState({issues: res.data.issues});
    }).catch(err =>{
      console.log(err);
    });

  }
    
  render() {
    
    const { data, issues } = this.state;
    
    const { open, closed, inProgress } = data;

    // using momentjs for date formatting
    const date = moment().format('MMMM YYYY');

    return (
      <div>
        <h1>Issues for {date}</h1>
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-sm">
              <h6>Open Issues</h6>
              <p>{open} Issues</p>
            </div>
            <div className="col-sm">
              <h6>Open Issues</h6>
              <p>{inProgress} Issues</p>
            </div>
            <div className="col-sm">
              <h6>Open Issues</h6>
              <p>{closed} Issues</p>
            </div>
          </div>
        </div>

        <Link to="/admin/users">
          Edit Users
        </Link>
        <br/ >
        <Link to="/admin/issues">
          Edit Issues
        </Link>


        <h2>Latest Posted Issues</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Building</th>
              <th scope="col">Floor</th>
              <th scope="col">Room</th>
              <th scope="col">Category</th>
            </tr>
          </thead>
          <tbody>
          {issues.map((issue, i) => {
              return (
                <tr key={i}>
                  <td>{issue.name}</td>
                  <td>{issue.description}</td>
                  <td>{issue.building}</td>
                  <td>{issue.floor}</td>
                  <td>{issue.room}</td>
                  <td>{issue.category}</td>
                  <td>
                    <Link to={`/issues/${issue._id}`}>View</Link> | <Link to={`/issues/${issue._id}`}>Edit</Link> | <Link to={`/issues/${issue._id}`}>Delete</Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default Dashboard;
