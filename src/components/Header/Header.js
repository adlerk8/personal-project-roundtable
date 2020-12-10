import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
    constructor() {
        super();
    }

    render() {
        console.log(this.props)
        return (
            <div classname="header">
                <div>Hey {this.props.user.username}</div>
                <h1 id="siteTitle">Roundtable</h1>
                <div><img src={this.props.user.profile_pic} alt="avatar"/></div>
            </div>
        )
    }
};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Header);