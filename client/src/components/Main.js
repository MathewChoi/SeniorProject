import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Issues from './Issues';
import Home from './Home';
import LandingPage from './LandingPage'
import About from './About';
import ReadIssue from './Issues/Read';
import CreateIssue from './Issues/Create';
import UpdateIssue from './Issues/Update';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Dashboard from './Dashboard';
import Logout from './Auth/Logout';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/issues" component={Issues}/>
      <Route exact path="/issues/create" component={CreateIssue}/>
      <Route exact path="/issues/update/:id" component={UpdateIssue}/>
      <Route exact path="/issues/:id" component={ReadIssue}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/logout" component={Logout}/>
      <Route exact path="/signup" component={Register}/>
      <Route exact path="/about" component={About}/>
      <Route exact path="/dashboard" component={Dashboard}/>
    </Switch>
  </main>
)

export default Main;
