import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../../App.css';

export default function LoginPage({usermap, setCurrent}) {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
        valid: false
    });

    const navigate = useNavigate();

    const onUsernameChange = event => {
        setLoginData({
            username: event.target.value,
            password: loginData.password,
            valid: loginData.valid
        });
    }

    const onPasswordChange = event => {
        setLoginData({
            username: loginData.username,
            password: event.target.value,
            valid: loginData.valid
        });
    }

    const setValid = (validity) => {
        setLoginData({
            username: loginData.username,
            password: loginData.password,
            valid: validity
        });
    }

    const validateInfo = () => {
        setValid(usermap.has(loginData.username) && usermap.get(loginData.username).password === loginData.password);
    }

    const submitHandler = () => {
        setCurrent(loginData.username);
        navigate('/home');
    }

    return (
        <div className="text-center m-5-auto">
            <h2>Login Page</h2>
            <form onSubmit={submitHandler}>
                <p>
                    <label>Username</label><br/>
                    <input type="text" id="username" required onChange={onUsernameChange} onBlur={validateInfo}/>
                </p>
                <p>
                    <label>Password</label>
                    <br/>
                    <input type="password" id="password" required onChange={onPasswordChange} onBlur={validateInfo}/>
                </p>
                <p>
                    <button id="sub_btn" type="submit" disabled={!loginData.valid}>Login</button>
                </p>
            </form>
            <footer>
                <p>Don't have an account? <Link to="/register">Click Here</Link> to create one!</p>
                <p><Link to="/">Back to the Home Page</Link>.</p>
            </footer>
        </div>
    )
}