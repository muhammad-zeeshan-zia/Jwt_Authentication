import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Welcome from './Components/Welcome';
import Login from './Components/Login';

function App() {
  return (

    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Welcome/>} />
      </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
