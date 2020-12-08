import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div>
            <Link to="/newpost">Write Something</Link>
            <Link to="/feed">Visit the Roundtable</Link>
            <Link to="/">Logout</Link>
        </div>
    )
};

export default Nav;

