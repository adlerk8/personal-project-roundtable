import React, { useState, useEffect } from 'react';
import Comment from '../Comment/Comment';
import axios from 'axios';
import { connect } from 'react-redux';

const Post = (props) => {
const [title, setTitle] = useState('');
const [content, setContent] = useState('');
const [timestamp, setTimestamp] = useState('');
const [username, setUsername] = useState('');
const [canEdit, setCanEdit] = useState(false);

useEffect(() => {
    const getPost = async () => {
        try {
            const res = await axios.get(`/api/post/${props.match.params.id}`)
            setTitle(res.data.title);
            setContent(res.data.content);
            setTimestamp(res.data.created_at);
            setUsername(res.data.username);
        } catch (err) {
            console.log(err)
        }
    };
    getPost();
}, [props.match.params]);

    const editPost = async (id, title, content) => {
        try {
            const res = await axios.put(`/api/posts/${id}, ${title, content}`);
            setTitle(res.data.title);
            setContent(res.data.content); 
        } catch(err) {
            console.log(err)
        }
    };

    const addComment = async (postid, commentBody) => {
        try{
            const res = await axios.post(`/api/comments/${postid}, ${commentBody}`)
            
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div className="postBody">
                <div className="postInfo">
                    <h3>Date: {timestamp}</h3>
                    <h2>Title: {title}</h2>
                    <h2>By: {username}</h2>
                    <button onClick={() => editPost(id)}>Edit</button>
                </div>
                <div className="postContent">
                    <button onClick={() => props.onDelete(props.match.params.id)}>Delete</button>
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