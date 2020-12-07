import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from 


class Auth extends Component {
    constructor() {
        super ();

        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    login = async (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        try {
            const user = await axios.post('/api/login', { username, password })
            this.props.loginUser(user.data)
            this.props.history.push('/dashboard')
        }
        catch (err) {
            console.log(err)
        }
    };

    register = async (e) => {
        e.preventDefault();
        const {username, password} = this.state
        try {
            const user = await axios.post('/api/register', {username, password})
            this.props.loginUser(user.data)
            this.props.history.push('/dashboard')
        }
        catch (err) {
            console.log(err)
        }
    };

    render() {
        const { username, password } = this.state;
        return (
            <div>
                <form>
                    <input
                        name="username"
                        value={username}
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        name="password"
                        type="password"
                        value={password}
                        onChange={e => this.handleChange(e)}
                    />
                    <div className="buttons">
                        <button onClick={e => this.register(e)}>Register</button>
                        <button onClick={e => this.login(e)}>Sign in</button>
                    </div>
                </form>


            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { loginUser })(Auth);