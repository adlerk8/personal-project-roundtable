import { connect } from 'react-redux';

const Header = (props) => {

    return (
        <div className="header">
            <div>Hey {props.user.username}</div>
            <h1 id="siteTitle">Roundtable</h1>
            <div><img src={props.user.profile_pic} alt="avatar"/></div>
        </div>
    )
};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Header);