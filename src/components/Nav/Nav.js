import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/reducer';

const Nav = (props) => {
    
    const logout = () => {
        axios.delete('/api/logout')
        props.logoutUser();
    };
    
    return (
        <div>
            <Link to="/newpost">Write Something</Link>
            <Link to="/feed">Home</Link>
            <Link to="/home">My Posts</Link>
            <Link to="/" onClick={logout}>Logout</Link>
        </div>
    )
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, { logoutUser })(Nav);

