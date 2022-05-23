import React, {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

const App = () => {

  return (
    <div>
     <Routes>
      <Route path='/' element={<Home/>} />
       <Route path='/login' element={<Login/>} />
       <Route path='/register' element={<Register/>} />
     </Routes>
    </div>
  )
}

export default App