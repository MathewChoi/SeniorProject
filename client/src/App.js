import React from 'react';
import './App.css';
import Main from './components/Main';
import Sidebar from './components/Sidebar';

const App = () => (
  <div className="wrapper">
    <Sidebar />
    <Main />
  </div>
)

export default App;
