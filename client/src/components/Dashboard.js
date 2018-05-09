import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import '../styles/Dashboard.css';
import moment from 'moment';
import auth from './Helpers/Authentication';


class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      data: {},
      // user: '', IssuesStats:'', latestIssues:[]
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

    // axios.get('/api/users/dashboard', { headers: {"Authorization": localStorage.getItem('token')}} )
    // .then((res) => {
    //   this.setState({user: res.data});
    // }).catch(err =>{
    //   console.log(err);

    // });
    // axios.get('/api/issues/stats')
    // .then((res)=>{
    //   this.setState({IssuesStats: res.data});
    // }).catch(err =>{
    //   console.log(err);
    // });
    
    // axios.get('/api/issues/latest-issues')
    // .then((res)=>{
    //   this.setState({latestIssues: res.data});
    // }).catch(err =>{
    //   console.log(err);
    // });
  }

  onDelete(id){
    const header = { headers: {"Authorization": localStorage.getItem('token')}};
    if (window.confirm("Are you sure?")) {
      axios.delete('/api/issues/'+id,header)
      .then((result) => {
        window.location.reload();
      });
    } 
  }
    
  render() {
    
    // const IssuesStats = this.state.IssuesStats;
    // const latestIssues = this.state.latestIssues;
    // const MONTH_NAMES = ["January ", "February ", "March ", "April ", "May ", "June ",
    // "July ", "August ", "September ", "October ", "November ", "December "];

    // const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    const { data, issues, users } = this.state;
    
    const { open, closed, inProgress } = data;

    const date = moment().format('MMMM YYYY');
    
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h1>{date}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
              <div className="card card-stats">
                  <div className="card-header card-header-danger card-header-icon">
                      <div className="card-icon">
                        <i className="material-icons">error_outline</i>
                      </div>
                      <p className="card-category">Open</p>
                      <h3 className="card-title">{open} Issues</h3>
                  </div>
                  <div className="card-footer">
                    <div className="stats">
                      <i className="material-icons">date_range</i> This Month
                    </div>
                  </div>
              </div>
          </div>
          <div className="col-md-4">
              <div className="card card-stats">
                  <div className="card-header card-header-warning card-header-icon">
                      <div className="card-icon">
                        <i className="material-icons">build</i>
                      </div>
                      <p className="card-category">In Progress</p>
                      <h3 className="card-title">{inProgress} Issues</h3>
                  </div>
                  <div className="card-footer">
                      <div className="stats">
                          <i className="material-icons">date_range</i> This Month
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-md-4">
              <div className="card card-stats">
                  <div className="card-header card-header-success card-header-icon">
                      <div className="card-icon">
                          <i className="material-icons">done</i>
                      </div>
                      <p className="card-category">Fixed</p>
                      <h3 className="card-title">{closed} Issues</h3>
                  </div>
                  <div className="card-footer">
                    <div className="stats">
                      <i className="material-icons">date_range</i> This Month
                    </div>
                  </div>
              </div>
          </div>
        </div>
        <div className="row">
        <div className="col-md-12">
          <div className="card">
              <div className="card-header card-header-primary">
                  <h4 className="card-title">New Issues</h4>
              </div>
              <div className="card-body">
                  <div className="table-responsive">
                      <table className="table">
                          <thead className=" text-primary">
                            <tr>
                              <th>Name</th>
                              <th>Description</th>
                              <th>Building</th>
                              <th>Floor</th>
                              <th>Room</th>
                              <th>Category</th>
                              <th></th>
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
                      <div className="text-center">
                        <Link className="btn btn-primary" to="/issues">
                          View More Issues
                        </Link>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        {/* <h1>{DAY_NAMES[new Date().getDay()]}, {MONTH_NAMES[new Date().getMonth()]} {new Date().getDate()}, {new Date().getFullYear()}</h1>
        
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
        })} */}
      </div>
    );
  }
  
}

export default Dashboard;
