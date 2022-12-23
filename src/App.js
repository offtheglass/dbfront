import React from 'react';
import './App.css';
import Navbar from'./components/Navbar';
import Connection from './components/Connection'
import Connection2 from './components/Connection2'
import Tablescan from './components/Tablescan'
import Tablescan2 from './components/Tablescan2'
import Tablescan3 from './components/Tablescan3'
import Tablescan4 from './components/Tablescan4'
import Tablescan5 from './components/Tablescan5'
import Tablescan6 from './components/Tablescan6'
import Joinonetable from './components/Joinonetable'
import Joinonetableresult from './components/Joinonetableresult'
import Joinmultipletable from './components/Joinmultipletable'
import Joinmultipletableresult from './components/Joinmultipletableresult'
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import { Redirect } from "react-router-dom"
import Joinonetablele from './components/Joinonetable';


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
         <Route
          path='/Tablescan2' element={<Tablescan2/>}
        />
        <Route
          path='/Tablescan3' element={<Tablescan3/>}
        />
        <Route
          path='/Tablescan4' element={<Tablescan4/>}
        />
        <Route
          path='/Tablescan5' element={<Tablescan5/>}
        />
        <Route
          path='/Tablescan6' element={<Tablescan6/>}
        />
        <Route
          path='/Joinonetable' element={<Joinonetablele/>}
        />
        <Route
          path='/Joinonetableresult' element={<Joinonetableresult/>}
        />
        <Route
          path='/Joinmultipletable' element={<Joinmultipletable/>}
        />
        <Route
          path='/Joinmultipletableresult' element={<Joinmultipletableresult/>}
        />
      </Routes>
    </Router>
    
  );
}

export default App;