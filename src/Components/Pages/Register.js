import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../../App.css';
import userdef from '../../userdef.png';

export default function RegisterPage({usermap, setUsermap, setCurrent}) {
    const [registerData, setRegisterData] = useState({
        username: '',
        nickname: '',
        password: '', 
        validate: '',
        photo: null,
        valid: false
    });

    const [error, setError] = useState({
        errorList: {}
    });

    const navigate = useNavigate();

    const onUsernameChange = event => {
        setRegisterData({ 
            username: event.target.value,
            nickname: registerData.nickname,
            password: registerData.password,
            validate: registerData.validate,
            photo: registerData.photo,
            valid: registerData.valid
        });
    }

    const onNicknameChange = event => {
        setRegisterData({ 
            username: registerData.username,
            nickname: event.target.value,
            password: registerData.password,
            validate: registerData.validate,
            photo: registerData.photo,
            valid: registerData.valid
        });
    }

    const onPasswordChange = event => {
        setRegisterData({ 
            username: registerData.username,
            nickname: registerData.nickname,
            password: event.target.value,
            validate: registerData.validate,
            photo: registerData.photo,
            valid: registerData.valid
        });
    }

    const onValidateChange = event => {
        setRegisterData({ 
            username: registerData.username,
            nickname: registerData.nickname,
            password: registerData.password,
            validate: event.target.value,
            photo: registerData.photo,
            valid: registerData.valid
        });
    }

    const onPhotoChange = event => {
        setRegisterData({ 
            username: registerData.username,
            nickname: registerData.nickname,
            password: registerData.password,
            validate: registerData.validate,
            photo: event.target.files[0],
            valid: registerData.valid
        });
        validateInfo();
    }

    const validateInfo = () => {
        let errors = {};
        let invalid = false;
        // password may contain 8-16 characters: a-z, A-Z, digits and the characters !@#$%^&*-_=+
        var passwordRegex = new RegExp("^(?=.*[a-zA-Z0-9!@#$%^&*.-_=+]).{8,16}");
        if (usermap.has(registerData.username)) {
            invalid = true;
            errors["username"] = "This Username Already Exists.";
        }
        if (!passwordRegex.test(registerData.password)) {
            invalid = true;
            errors["password"] = "Password must have 8 to 16 alphanumerical or !@#$%^&*.-_=+ characters."
        }
        if (registerData.password !== registerData.validate) {
            invalid = true;
            errors["validate"] = "Passwords Must Match."
        }
        setRegisterData({ 
            username: registerData.username,
            nickname: registerData.nickname,
            password: registerData.password,
            validate: registerData.validate,
            photo: registerData.photo,
            valid: !invalid
        });
        setError({
            errorList: errors
        });
    }

    const submitUser = event => {
        event.preventDefault();
        let newUser = {};
        let chatRefs = {};
        newUser["username"] = registerData.username;
        newUser["nickname"] = registerData.nickname;
        newUser["password"] = registerData.password;
        if (registerData.photo !== null) {
            newUser["photo"] = registerData.photo;
        } else {
            newUser["photo"] = userdef;
        }
        newUser["chats"] = chatRefs;
        let newMap = usermap;
        newMap.set(registerData.username, newUser);
        setUsermap(newMap);
        setCurrent(registerData.username);
        navigate('/home');
    }

    return (
        <div className="text-center m-5-auto">
            <h2>Register</h2>
            <h5>Create your personal account</h5>
            <form onSubmit={submitUser}>
                <p>
                    <label>Username</label><br/>
                    <input type="text" id="username" required onChange={onUsernameChange} onBlur={validateInfo}/>
                    <div className="text-danger">{error.errorList["username"]}</div>
                </p>
                <p>
                    <label>Nickname</label><br/>
                    <input type="text" id="nickname" required onChange={onNicknameChange} onBlur={validateInfo}/>
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type="password" id="password" required onChange={onPasswordChange} onBlur={validateInfo}/>
                    <div className="text-danger">{error.errorList["password"]}</div>
                </p>
                <p>
                    <label>Validate Password</label><br/>
                    <input type="password" id="validate" required onChange={onValidateChange} onBlur={validateInfo}/>
                    <div className="text-danger">{error.errorList["validate"]}</div>
                </p>
                <p>
                    <label>Photo</label><br/>
                    <input type="file" id="photo" onChange={onPhotoChange} accept="image/*"/>
                </p>
                <p>
                    <button id="sub_btn" type="submit" disabled={!registerData.valid}>Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to the Home Page</Link>.</p>
            </footer>
        </div>
    );
}