import React from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';

export default function HomePage({username, setCurrent}) {
    const logoutHandler = () => {
        setCurrent('');
    }
    return (
        <div className="text-center">
            <h1 className="main-title home-page-title">Welcome!</h1>
            <h3 className="username-logged-in">You are logged in as: {username}</h3>
            <Link to="/">
                <button className="primary-button" onClick={logoutHandler}>Logout and Return to the Home Page.</button>
            </Link>
        </div>
    );
}