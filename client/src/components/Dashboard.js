import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Dashboard.css';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '', IssuesStats:'', latestIssues:[]
    };
  }

  componentWillMount(){
    
    axios.get('/api/users/dashboard', { headers: {"Authorization": localStorage.getItem('token')}} )
    .then((res) => {
      this.setState({user: res.data});
    }).catch(err =>{
      console.log(err);

    });
    axios.get('/api/issues/stats')
    .then((res)=>{
      this.setState({IssuesStats: res.data});
    }).catch(err =>{
      console.log(err);
    });
    
    axios.get('/api/issues/latest-issues')
    .then((res)=>{
      this.setState({latestIssues: res.data});
    }).catch(err =>{
      console.log(err);
    });
  }
    
  render() {
    
    const IssuesStats = this.state.IssuesStats;
    const latestIssues = this.state.latestIssues;
    const MONTH_NAMES = ["January ", "February ", "March ", "April ", "May ", "June ",
    "July ", "August ", "September ", "October ", "November ", "December "];

    const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return (
      <div>
        <h1>{DAY_NAMES[new Date().getDay()]}, {MONTH_NAMES[new Date().getMonth()]} {new Date().getDate()}, {new Date().getFullYear()}</h1>
        
        <div className="dashboard-row">
          <div className="box">
            <h3 className="box-header"> Open Issues</h3>
            <div className="pic-text">
              <h4 className="text"> {IssuesStats.openIssues} Issues </h4>
            </div>
          </div>
          <div className="box">
            <h3 className="box-header"> Issues In-progress</h3>
            <div className="pic-text">
              <h4 className="text"> {IssuesStats.inProgressIssues} Issues </h4>
            </div>
          </div>
          <div className="box">
            <h3 className="box-header"> Closed Issues</h3>
            <div className="pic-text">
              <h4 className="text"> {IssuesStats.closedIssues} Issues </h4>
            </div>
          </div>
        </div>

        <h2>Newest Reported Issues</h2>
        {latestIssues.map((issue, i) => {
          return (
            <li key={i}>
              <Link to={`/issues/${issue._id}`}>
                {issue.name}
              </Link>
            </li>
          )
        })}
      </div>
    );
  }
  
}

export default Dashboard;
