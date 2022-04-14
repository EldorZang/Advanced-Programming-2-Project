import React from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';

export default function HomePage() {
    return (
        <div className="text-center">
            <h1 className="main-title home-page-title">Welcome!</h1>
            <Link to="/">
                <button className="primary-button">Logout and Return to the Home Page.</button>
            </Link>
        </div>
    );
}