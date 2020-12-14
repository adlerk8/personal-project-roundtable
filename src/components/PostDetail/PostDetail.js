import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Comment from '../Comment/Comment';
import axios from 'axios';
import { connect } from 'react-redux';
import styled from 'styled-components';

const WholePost = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const PostBox = styled.div`
    border: 1px;
    border-color: black;
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    margin: 0 auto;
`

const PostInfo = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #80ADA0;
    width: 300px;
    font-family: 'Hammersmith One', sans-serif;
    padding: 10px;
`

const CommentBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Button = styled.button`
    border-color: #F2F2F2;
    border-width: 1px;
    font-family: 'Hammersmith One', sans-serif;
    font-size: 14px;
    color: white;
    background-color: #DAA4B9;
    margin: 7px;
    padding: 3px 5px 3px 5px;
    
`

const Date = styled.h3`
    font-size: 12px;
    color: whitesmoke;
`

const Title = styled.h2`
    font-weight: lighter;
`

const Author = styled.h2`
    font-weight: lighter;
    font-size: 16px;
`

const ContentStyle = styled.p`
    font-family: 'Cantarell', sans-serif;
`

const Post = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [username, setUsername] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentBody, setCommentBody] = useState('');
    const { postId } = useParams();
    const history = useHistory();

    const getComments = async () => {
        try {
            const res = await axios.get(`/api/comments/${postId}`)
            setComments(res.data);
        } catch (err) {
            console.log(err)
        }
    };

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

    useEffect(() => {        
        getPost();
        getComments();
    }, []);

    const editPost = async () => {
        try {
            const res = await axios.put(`/api/posts/${postId}`, { title, content });
            setTitle(res.data.title);
            setContent(res.data.content);
            setIsEditing(false);
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

    const addComment = async () => {
        try {
            await axios.post(`/api/comments/${postId}`, {commentBody})
            getComments();
            setCommentBody('');
        } catch (err) {
            console.log(err);
        }
    };

    const canEdit = props.user.username === username;

    const mappedComments = comments.map((comment) => {
        return (
            <Comment key={comment.id} {...comment}/>
        )
    })

    return (
        <WholePost>
            <PostBox>
                <PostInfo>
                    <Date>{timestamp}</Date>
                    {isEditing === true ?
                        <input
                            placeholder="Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        :
                        <Title>Title: {title}</Title>
                    }
                    <Author>By: {username}</Author>
                    {canEdit ?
                            <Button onClick={() => setIsEditing(true)}>Edit</Button>
                        :
                            null
                    }
                    
                </PostInfo>
                <ContentStyle>
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
                        <Button onClick={() => deletePost(postId)}>Delete</Button>
                        :
                        null
                    }
                    {isEditing === true ?
                        <>
                            <Button onClick={() => editPost()}>Update Post</Button>
                        </>
                        :
                        null
                    }
                    </div>
                </ContentStyle>
                <CommentBox>
                    {mappedComments}
                </CommentBox>
                <div>
                    <input
                        placeholder="Give some feedback..."
                        value={commentBody}
                        onChange={e => setCommentBody(e.target.value)}
                    />
                    <Button onClick={() => addComment(postId)}>Add Comment</Button>
                </div>
            </PostBox>
        </WholePost>
    );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Post);