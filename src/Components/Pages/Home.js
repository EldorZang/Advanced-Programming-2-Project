import React from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';
import bg from './background.png';

export default function HomePage({username, setCurrent}) {
    const logoutHandler = () => {
        setCurrent('');
    }
    return (
        <div style={background}>
            <h1 className="title center-text pad-top3">Welcome!</h1>
            <h1 className="title center-text pad-top3">You are logged in as: {username}</h1>
            <div className="buttons center-text pad-top3">
                <Link to="/">
                    <button className="primary-button wide-button" onClick={logoutHandler}>Logout and Return to the Home Page.</button>
                </Link>
            </div>
        </div>
    );
}

const background = {
    width: "100%",
    height: "100vh",
    background: `url(${bg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}