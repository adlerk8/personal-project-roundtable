import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/reducer';
import { useHistory } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        background-color: #F5DDDD;
        background-size: 100% 100%;
        height: 100%;
        width: 100%;
    }
`
const AuthStyling = styled.div`
    display: block;
    margin: 0 auto;
    margin-top: 250px;
`
const InputFields = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Hammersmith One', sans-serif;
    margin: 2px;
`
const SingleField = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 5px;
    margin: 2px;
`
const Label = styled.p`
    margin: 0 5px 0 0;
    font-family: 'Hammersmith One', sans-serif;
    font-size: 16px;
`
const AppName = styled.h1`
    font-size: 62px;
    font-weight: bold;
    text-align: center;
    color: #243156;
    margin: 0 auto;
    margin-bottom: 25px;
    font-family: 'Caveat', cursive;
    text-shadow: -3px 3px 0 rgba(0, 0, 0, 0.1), -2px 2px 0 rgba(0, 0, 0, 0.1);
    @media (max-width: 400px) {
        font-size: 20px;
    }
`
const Button = styled.button`
    display: inline-block;
    padding: 5px 7px 5px 7px;
    margin: 10px;
    border-radius: 0.2em;
    box-sizing: border-box;
    text-decoration: none;
    font-family:'Hammersmith One', sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #FFFFFF;
    background-color: #B38D97;
    box-shadow: inset 0 -0.6em 1em -0.35em rgba(0,0,0,0.17), inset 0 0.6em 2em -0.3em rgba(255,255,255,0.15), inset 0 0 0em 0.05em rgba(255,255,255,0.12);
    text-align: center;
    position: relative;
    cursor: url(pentip1.png), pointer;
`
const Register = styled(Button)`
    background-color: #465362;
`
const Loginbox = styled.div`
    background-color: #F2F2F2;
    padding: 20px;
    width: 350px;
    margin: 0 auto;
    -webkit-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
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
            <GlobalStyle/>
            <AppName>
                <h1>Welcome to Roundtable</h1>
            </AppName>
            <Loginbox>
                <form>
                    <InputFields>
                        <SingleField>
                            <Label>Username:</Label>  
                            <input
                                name="username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </SingleField>
                        <SingleField>
                            <Label>Password:</Label>  
                            <input
                                name="password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </SingleField>
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