import React from 'react';
import './App.css';
import Navbar from'./components/Navbar';
import Connection from './components/Connection'
import Connection2 from './components/Connection2'
import Tablescan from './components/Tablescan'
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import { Redirect } from "react-router-dom"


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact />
        <Route path='Connection' element={<Connection/>} />
        <Route
          path='/Connection2' element={<Connection2/>}
        />
        <Route
          path='/Tablescan' element={<Tablescan/>}
        />
      </Routes>
    </Router>
    
  );
}

export default App;