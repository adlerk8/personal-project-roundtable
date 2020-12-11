import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostDetail from '../PostDetail/PostDetail';


const PostList = (props) => {
const [posts, setPosts] = useState([]);
const { id } = useParams();

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

    const deletePost = async (id) => {
        try {
            const res = await axios.delete(`/api/posts/${id}`);
            setPosts(res.data);
        } catch(err) {
            console.log(err);
        };
    };

    const mappedPosts = posts.map((post) => {
        return (
            <div key={post.id}>
                <div className="postInfo">
                    {console.log(props)}
                    <h3>Date: {post.created_at}</h3>
                    <h2>Title: {post.title}</h2>
                    <h2>By: {post.username}</h2>
                    {/* <button onClick={() => editPost(id)}>Edit</button> */}
                </div>
                <div className="postContent">
                    {/* <button onClick={() => props.onDelete(id)}>Delete</button> */}
                    <p>{post.content}</p>
                </div>
            </div>
        )
    })

    return (
        <div>
            {console.log(posts)}
            {mappedPosts}
        </div>
    );
}

export default PostList;