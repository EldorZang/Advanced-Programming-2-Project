import React from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';

export default function SignInPage() {
    return (
        <div className="text-center m-5-auto">
            <h2>Login Page</h2>
            <form action="/home">
                <p>
                    <label>Username or Email Address</label><br/>
                    <input type="text" name="first_name" required />
                </p>
                <p>
                    <label>Password</label>
                    <br/>
                    <input type="password" name="password" required />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            <footer>
                <p>Don't have an account? <Link to="/register">Click Here</Link> to create one!</p>
                <p><Link to="/">Back to the Home Page</Link>.</p>
            </footer>
        </div>
    )
}