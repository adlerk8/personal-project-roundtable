import React, { useState, useEffect } from 'react';
import Comment from '../Comment/Comment';
import axios from 'axios';
import { connect } from 'react-redux';

const Post = (props) => {
const [title, setTitle] = useState('');
const [content, setContent] = useState('');
const [timestamp, setTimestamp] = useState('');
const [username, setUsername] = useState('');
const [profilePic, setProfilePic] = useState('');
const [canEdit, setCanEdit] = useState(false);

useEffect(() => {
    axios
        .get(`/api/post/${props.match.params.id}`)
        .then((res) => {
            setTitle(res.data.title);
            setContent(res.data.content);
            setTimestamp(res.data.created_at);
            setUsername(res.data.username);
            setProfilePic(res.data.profile_pic);
        })
        .catch((err) => {
            console.log(err)
        })
})
    // const handleChange = (e) => {
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     })
    // };

    const editPost = () => {
        axios
        .put(`/api/posts/${props.match.params.id}, ${title, content}`)
        .then((res) => {
            setTitle(res.data.title);
            setContent(res.data.content); 
        })
        .catch((err) => {
            console.log(err)
        })
    };

    const deletePost = () => {
        axios
        .delete(`/api/posts/${props.match.params.id}`)
    };

    const addComment = () => {
        
    };

    return (
        <div>
            <div className="postBody">
                <div className="postInfo">
                    <h3>Date: {timestamp}</h3>
                    <h2>Title: {title}</h2>
                    <button>Edit</button>
                </div>
                <div className="postContent">
                    <button onClick={deletePost}>Delete</button>
                    <p>{content}</p>
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

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Post);