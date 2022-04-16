import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './Components/Pages/Landing';
import LoginPage from './Components/Pages/Login'
import RegisterPage from './Components/Pages/Register'
import HomePage from './Components/Pages/Home';

function App() {
  const [users, setUsers] = useState(new Map());
  const [currentUser, setCurrentUser] = useState('');
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage usermap={users} setCurrent={setCurrentUser}/>} />
          <Route path="/register" element={<RegisterPage usermap={users} setUsermap={setUsers} setCurrent={setCurrentUser}/>} />
          <Route path="/home" element={<HomePage username={currentUser} setCurrent={setCurrentUser}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
