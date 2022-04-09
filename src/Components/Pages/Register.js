import React from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';

export default function RegisterPage() {
    state = {
        uname: '',
        nname: '',
        pw: '',
        pwv: '',
        file: null
    }

    onUNameChange = event => {
        this.setState({ uname: event.target.value});
    }

    onNNameChange = event => {
        this.setState({ nname: event.target.value});
    }

    onPWChange = event => {
        this.setState({ pw: event.target.value});
    }

    onPWVChange = event => {
        this.setState({ pwv: event.target.value});
    }

    onFileChange = event => {
        this.setState({ file: event.target.files[0]});
    }

    return (
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form action="/home">
                <p>
                    <label>Username</label><br/>
                    <input type="text" name="uname" required />
                </p>
                <p>
                    <label>Nickname</label><br/>
                    <input type="text" name="nname" required />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type="password" name="password" required />
                </p>
                <p>
                    <label>Validate Password</label><br/>
                    <input type="password" name="password" required />
                </p>
                <p>
                    <label>Photo</label><br/>
                    <input type="file" name="profilephoto" onChange={this.onFileChange}/>
                </p>
                <p>
                    <button id="sub_btn" type="submit">Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to the Home Page</Link>.</p>
            </footer>
        </div>
    );
}