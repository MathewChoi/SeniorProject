import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import home_icon from './../resources/home.svg';
import '../stylesheets/Dashboard.css';
import 'bulma/css/bulma.css';

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
		return(
			<div className="db-sidenav">
				<p className="db-title">
					Welcome back.
				</p>
				<div className="db-sidenav-item red">
					<div className="db-icon blue"><img src={home_icon} /></div>
					<div className="db-text green">Home</div>
				</div>
				<div className="db-sidenav-item">
					<img className="db-icon" src={home_icon} />Home
				</div>
				<div className="db-sidenav-item">
					<img className="db-icon" src={home_icon} />Home
				</div>
			</div>
		);
	}
  /*render() {
    
    const IssuesStats = this.state.IssuesStats;
    const latestIssues = this.state.latestIssues;
    const user = this.state.user;
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

        <h2>Latest Posted Issues</h2>
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
	
	OTEHR:
	
	<aside class="menu">
			<p class="menu-label">
				General
			</p>
			<ul class="menu-list">
				<li><a>Dashboard</a></li>
				<li><a>Customers</a></li>
			</ul>
			<p class="menu-label">
				Administration
			</p>
			<ul class="menu-list">
				<li><a>Team Settings</a></li>
				<li>
					<a class="is-active">Manage Your Team</a>
					<ul>
						<li><a>Members</a></li>
						<li><a>Plugins</a></li>
						<li><a>Add a member</a></li>
					</ul>
				</li>
				<li><a>Invitations</a></li>
				<li><a>Cloud Storage Environment Settings</a></li>
				<li><a>Authentication</a></li>
			</ul>
			<p class="menu-label">
				Transactions
			</p>
			<ul class="menu-list">
				<li><a>Payments</a></li>
				<li><a>Transfers</a></li>
				<li><a>Balance</a></li>
			</ul>
		</aside>
	
  }*/
  
}

export default Dashboard;