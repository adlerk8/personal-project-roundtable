import React, { Component } from 'react';

class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    addComment = () => {

    };

    editComment = () => {

    };

    deleteComment = () => {

    };

    render() {
        return (
            <div className="outer-comment-container">
                <div className="comment-pic">
                    <img id="profile-pic" src={this.props.profilePic}/>
                </div>
                <div className="commentContent">
                    <p onChange={e => this.handleChange(e)}></p>
                    <div className="edit-delete-comment">
                        {/* <button onClick={deleteComment()}>Delete</button>
                        <button onClick={editComment()}>Edit</button> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Comment;