import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


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
            <div key={post.id}>
                <div className="postInfo">
                    <h3>Date: {post.created_at}</h3>
                    <h2>Title: {post.title}</h2>
                    <h2>By: {post.username}</h2>
                    <button><Link to={`/post/${post.id}`}>View Post</Link></button>
                </div>
                <div className="postContent">                   
                    <p>{post.content}</p>
                </div>
            </div>
        )
    })

    return (
        <div>
            {mappedPosts}
        </div>
    );
}

export default PostList;