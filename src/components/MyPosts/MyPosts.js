import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const MyPosts = (props) => {
const [posts, setPosts] = useState([]);
const { id } = useParams();

useEffect(() => {
    const getMyPosts = async () => {
        try {
            const res = await axios.get(`/api/posts`)
            setPosts(res.data);
        } catch (err) {
            console.log(err)
        }
    }
    getMyPosts();
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
            {mappedPosts}
        </div>
    );
}

export default MyPosts;