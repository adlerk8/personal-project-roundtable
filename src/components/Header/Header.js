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
                <div>Hey {this.props.username}</div>
                <h1 id="siteTitle">Roundtable</h1>
                <div><img src={this.props.writer.profilePic} alt="avatar"/></div>
            </div>
        )
    }
};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Header);