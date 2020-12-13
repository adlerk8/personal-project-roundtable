import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Comment from '../Comment/Comment';
import axios from 'axios';
import { connect } from 'react-redux';

const Post = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [username, setUsername] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const { postId } = useParams();
    const history = useHistory();

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get(`/api/post/${postId}`)
                setTitle(res.data.title);
                setContent(res.data.content);
                setTimestamp(res.data.created_at);
                setUsername(res.data.username);
            } catch (err) {
                console.log(err)
            }
        };
        getPost();
    }, []);

    const editPost = async (postId, title, content) => {
        try {
            const res = await axios.put(`/api/posts/${postId}`, { title, content });
            setTitle(res.data.title);
            setContent(res.data.content);
        } catch (err) {
            console.log(err)
        }
    };

    const deletePost = async (id) => {
        try {
            await axios.delete(`/api/posts/${id}`);
            history.push('/home');
        } catch (err) {
            console.log(err);
        };
    };

    const addComment = async (postid, commentBody) => {
        try {
            const res = await axios.post(`/api/comments/${postid}`, commentBody)

        } catch (err) {
            console.log(err);
        }
    };

    const canEdit = props.user.username === username;

    return (
        <div>
            <div className="postBody">
                <div className="postInfo">
                    <h3>Date: {timestamp}</h3>
                    {isEditing === true ?
                        <input
                            placeholder="Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        :
                        <h2>Title: {title}</h2>
                    }
                    <h2>By: {username}</h2>
                    {canEdit ?
                            <button onClick={() => setIsEditing(true)}>Edit</button>
                        :
                            null
                    }
                    
                </div>
                <div className="postContent">
                {isEditing === true ?
                    <input
                        placeholder="Your beautiful writing goes here..."
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                    :
                    <p>{content}</p>
                    }
                    <div>
                    {canEdit ?
                        <button onClick={() => deletePost(postId)}>Delete</button>
                        :
                        null
                    }
                    {isEditing === true ?
                        <>
                            <button onClick={() => editPost(postId)}>Update Post</button>
                        </>
                        :
                        null
                    }
                    </div>
                    <button>Add Comment</button>
                </div>
                <div className="comment-container">
                    <ul>
                        <li><Comment /></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Post);