import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const PostBox = styled.div`
    border: 1px;
    border-color: black;
    width: 600px;
    padding: 20px;
    margin: 0 auto;
`
const Test = styled.div`
    display: inline-block;
`

const PostInfo = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #80ADA0;
    width: 300px;
    font-family: 'Hammersmith One', sans-serif;
    padding: 10px;
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

const ContentStyle = styled.p`
    font-family: 'Cantarell', sans-serif;
    display: inline-block;
`

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getAllPosts = async () => {
            try {
                const res = await axios.get(`/api/allposts`)
                setPosts(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        getAllPosts();
    }, []);


    const mappedPosts = posts.map((post) => {
        return (
            <PostBox key={post.id}>
                <Test>
                    <PostInfo>
                        <Date>{post.created_at}</Date>
                        <Title>{post.title}</Title>
                        <Author>By: {post.username}</Author>
                        <Button><Link to={`/post/${post.id}`}>View Post</Link></Button>
                    </PostInfo>
                    <ContentStyle>                   
                        <p>{post.content}</p>
                    </ContentStyle>
                </Test>
            </PostBox>
        )
    })

    return (
        <div>
            {mappedPosts}
        </div>
    );
}

export default PostList;