import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/reducer';
import { useHistory } from 'react-router-dom';


const Auth = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();


    const login = async (e) => {
        e.preventDefault();
        try {
            const user = await axios.post('/api/login', { username, password })
            props.loginUser(user.data)
            history.push('/home')
        }
        catch (err) {
            console.log(err)
        }
    };

    const register = async (e) => {
        e.preventDefault();
        try {
            const user = await axios.post('/api/register', {username, password})
            props.loginUser(user.data)
            history.push('/home')
        }
        catch (err) {
            console.log(err)
        }
    };

    return (
        <div>
            <h1>Welcome to Roundtable</h1>
            <form>
                <input
                    name="username"
                    placeholder="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    name="password"
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <div className="buttons">
                    <button onClick={e => register(e)}>Join Roundtable</button>
                    <button onClick={e => login(e)}>Sign in</button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { loginUser })(Auth);