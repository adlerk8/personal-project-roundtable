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
    position: absolute;
    z-index: 1;
    top: 170px;
    left: 0;
    overflow-x: hidden;
    display: flex;
    @media (max-width: 400px) {
        width: 100%;
        height: 32px;
    }
`

const LinkStyle = styled.div`
    text-decoration: none;
    color: whitesmoke;
    font-family: 'Hammersmith One', sans-serif;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 20px;
    &:visited {
        color: whitesmoke;
    }
    @media (max-width: 400px) {
        font-size: 14px;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        padding: 0px;
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

