import React, { Component } from 'react';
import Comment from '../Comment/Comment';

class Post extends Component {
    constructor() {
        super();

        this.state = {
            comment: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    editContent = () => {

    };

    deletePost = () => {

    };

    render() {
        return (
            <div>
                <div className="postBody">
                    <div className="postInfo">
                        <h3>Date</h3>
                        <h2>Title</h2>
                        <button onClick={editContent()}>Edit</button>
                    </div>
                    <div className="postContent">
                        <button onClick={deletePost()}>Delete</button>
                        <p>Content</p>
                    </div>
                    <div className="comment-container">
                        <Comment/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;