import { connect } from 'react-redux';
import styled from 'styled-components';

const AppName = styled.h1`
    font-size: 48px;
    text-shadow: 0px 0px 4px white;
    text-align: center;
    color: #010F20;
    font-family: 'Caveat', cursive;
    @media (max-width: 400px) {
        font-size: 24px;
    }
`

const Username = styled.div`
    font-family: 'Caveat', cursive;
    font-size: 24px;
    @media (max-width: 400px) {
        font-size: 16px;
    }
`
const ProfilePic = styled.img`
    border-radius: 50%;
    max-height: 65px;
    background-color: #F2F2F2;
`
const HeaderStyle = styled.div`
    background: url("header_img.jpg");
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 150px;
    padding: 10px;
    @media (max-width: 400px) {
        min-height: 100px;
    }
`

const Header = (props) => {

    return (
        <HeaderStyle>
            <Username>Hey {props.user.username}</Username>
            <AppName id="siteTitle">Roundtable</AppName>
            <ProfilePic src={props.user.profile_pic} alt="avatar" />
        </HeaderStyle>
    )
};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Header);