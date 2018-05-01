import React from 'react';
import './App.css';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const App = () => (
  <div>
    {/* <Navbar /> */}
    <Sidebar />
    <div className="container">
      <Main />
    </div>
  </div>
)

export default App;
