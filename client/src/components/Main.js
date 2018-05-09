import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Issues from './Issues';
import Facilities from './Facilities';
import Home from './Home';
import About from './About';
import ReadFacility from './Facilities/Read';
import CreateFacility from './Facilities/Create';
import AddFloor from './Facilities/AddFloor';
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
import MaterialNavBar from './MaterialNavBar';
import Footer from './Footer';

const Main = () => (
  <div className="main-panel">
    <MaterialNavBar />
    <div className="content mt-0">
      <div className="row">
        <div className="col-md-10 mx-auto">
          <Switch>
            <Route exact path="/" component={Home}/>
          
            <Route exact path="/issues" component={Issues}/>
            <Route exact path="/facilities" component={Facilities}/>
          
            <PrivateRoute exact path="/facilities/create" component={CreateFacility} />
            <PrivateRoute exact path="/facilities/update/:id" component={AddFloor} />  
            <PrivateRoute exact path="/facilities/:id" component={ReadFacility} />

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
          <Footer/>
        </div>
      </div>
    </div>
  </div>
  
)

export default Main;
