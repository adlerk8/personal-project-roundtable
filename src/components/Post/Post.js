import React, { Component } from 'react';
import Comment from '../Comment/Comment';

class Post extends Component {
    constructor() {
        super();

        this.state = {
            title: '',
            content: '',
            timestamp: '',
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

    addComment = () => {

    };

    render() {
        return (
            <div>
                <div className="postBody">
                    <div className="postInfo">
                        <h3>Date</h3>
                        <h2>Title</h2>
                        <button>Edit</button>
                    </div>
                    <div className="postContent">
                        <button>Delete</button>
                        <p>Content</p>
                        <button>Add Comment</button>
                    </div>
                    <div className="comment-container">
                        <ul>
                            <li><Comment/></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;