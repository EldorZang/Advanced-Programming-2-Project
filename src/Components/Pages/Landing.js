import React from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';

export default function LandingPage() {
    return (
        <header>
            <h1 className="main-title text-center">Welcome to our website! Please Login or Register Down Below.</h1>
            <div className="buttons text-center">
                <Link to="/login">
                    <button className="primary-button">Login</button>
                </Link>
                <Link to="/register">
                    <button className="primary-button" id="reg_btn"><span>Register</span></button>
                </Link>
            </div>
        </header>
    );
}