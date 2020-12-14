import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/reducer';
import styled from 'styled-components';

const NavStyle = styled.div`
    background-color: #011936;
    height: 100%;
    width: 200px;
    position: fixed;
    z-index: 1;
    top: 170px;
    left: 0;
    overflow-x: hidden;
    padding-top: 20px;
    display: flex;
`

const LinkStyle = styled.div`
    color: whitesmoke;
    font-family: 'Hammersmith One', sans-serif;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    &:visited {
        color: whitesmoke;
    }
`    

const Nav = (props) => {
    
    const logout = () => {
        axios.delete('/api/logout')
        props.logoutUser();
    };
    
    return (
        <NavStyle>
            <LinkStyle>
                <Link to="/newpost">Write Something</Link>
                <Link to="/home">Home</Link>
                <Link to="/myposts">My Posts</Link>
                <Link to="/" onClick={logout}>Logout</Link>
            </LinkStyle>
        </NavStyle>
    )
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, { logoutUser })(Nav);

