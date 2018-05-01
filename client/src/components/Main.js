import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Issues from './Issues';
import Home from './Home';
import About from './About';
// import ReadFacility from './Facilities/Read';
import CreateFacility from './Facilities/Create';
// import UpdateFacility from './Facilities/Update';
import ReadIssue from './Issues/Read';
import CreateIssue from './Issues/Create';
import UpdateIssue from './Issues/Update';
import FacilitiesIssues from './Issues/FacilityIssues'; 
import ListFacilities from './ListFacilities';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Dashboard from './Dashboard';
import Logout from './Auth/Logout';
import PrivateRoute from './Helpers/PrivateRoute';
import AdminRoute from './Helpers/AdminRoute';
import GenericNotFound from './Notfound';

import AdminUsersPage from './Admin/AdminUsersPage';
import AdminIssuesPage from './Admin/AdminIssuesPage';
import AdminDashboard from './Admin/AdminDashboard';

import ReadUser from './Users/Read';
import UpdateUser from './Users/Update';


const Main = () => (
  <div className="main-panel">
    <Switch>
      <Route exact path="/" component={Home}/>
      <PrivateRoute path="/facilities/create" component={CreateFacility} />
      {/* <PrivateRoute path="/facilities" component={ReadFacility} /> */}
      
      <Route exact path="/issues" component={Issues}/>
      <PrivateRoute exact path="/issues/create" component={CreateIssue}/>
      <PrivateRoute exact path="/issues/update/:id" component={UpdateIssue}/>
      <Route exact path="/issues/:id" component={ReadIssue}/>
      <Route exact path="/issues/facility-issues/:facility" component={FacilitiesIssues}/>
      <Route exact path="/facilities" component={ListFacilities}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/logout" component={Logout}/>
      <Route exact path="/signup" component={Register}/>
      <Route exact path="/about" component={About}/>
      <PrivateRoute path="/dashboard" component={Dashboard}/>

      <AdminRoute path="/admin/users/update/:id" component={UpdateUser}/>
      <AdminRoute path="/admin/users/:id" component={ReadUser}/>
      <AdminRoute path="/admin/users" component={AdminUsersPage}/>
      <AdminRoute path="/admin/issues" component={AdminIssuesPage}/>
      <AdminRoute path="/admin/dashboard" component={AdminDashboard}/>

      <Route component={GenericNotFound} />
    </Switch>
  </div>
)

export default Main;
