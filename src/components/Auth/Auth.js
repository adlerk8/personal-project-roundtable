import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/reducer';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const AuthStyling = styled.div`
    background-color: #F3E5E0;
`
const InputFields = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Hammersmith One', sans-serif;
    margin: 2px;
`
const Label = styled.label`
    padding: 5px;
    margin: 2px;
`

const AppName = styled.h1`
    font-size: 32px;
    text-align: center;
    color: #010F20;
    font-family: 'Caveat', cursive;
    @media (max-width: 400px) {
        font-size: 20px;
    }
`
const Button = styled.button`
    border-color: #010F20;
    border-width: 2px;
    font-family: 'Hammersmith One', sans-serif;
    font-size: 14px;
    color: white;
    background-color: #987381;
    margin: 7px;
    padding: 3px 5px 3px 5px;
`

const Register = styled(Button)`
    background-color: #465362;
`

const Loginbox = styled.div`
    background-color: #F2F2F2;
    padding: 20px;
    width: 350px;
    margin: 0 auto;
    @media (max-width: 400px) {
        width: 275px;
    }
`

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
        <AuthStyling>
            <AppName>
                <h1>Welcome to Roundtable</h1>
            </AppName>
            <Loginbox>
                <form>
                    <InputFields>
                        <Label>Username:  
                            <input
                                name="username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </Label>
                        <Label>Password:  
                            <input
                                name="password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Label>
                    </InputFields>
                </form>
                <div>
                    <Register onClick={e => register(e)}>Join Roundtable</Register>
                    <Button onClick={e => login(e)}>Sign in</Button>
                </div>
            </Loginbox> 
        </AuthStyling>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { loginUser })(Auth);