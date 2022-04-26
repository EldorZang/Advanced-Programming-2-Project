import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './Components/Pages/Landing';
import LoginPage from './Components/Pages/Login'
import RegisterPage from './Components/Pages/Register'
import HomePage from './Components/Pages/Home';

function App() {
  const [users, setUsers] = useState(new Map([
    ["user1", {
      userName: "user1",
    nickName: "user1Rocks",
    password: "user1pass",
    profile: "profile_1.jpg",
    friends: ["user2"]
}],
["user2", {
  userName: "user2",
    nickName: "user2Rocks",
    password: "user2pass",
    profile: "profile_1.jpg",
    friends: ["user3"]
}],
["user3", {
  userName: "user3",
    nickName: "user3Rocks",
    password: "user3pass",
    profile: "profile_1.jpg",
    friends: []
}]
]));
  const [currentUser, setCurrentUser] = useState('');
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage usermap={users} setCurrent={setCurrentUser}/>} />
        <Route path="/register" element={<RegisterPage usermap={users} setUsermap={setUsers} setCurrent={setCurrentUser}/>} />
        <Route path="/home" element={<HomePage username={currentUser} usermap={users}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
