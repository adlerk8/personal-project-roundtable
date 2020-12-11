import { useState, useEffect} from 'react';
import axios from 'axios';
import PostDetail from '../PostDetail/PostDetail';


const PostList = (props) => {
const [posts, setPosts] = useState([]);

useEffect(() => {
    const getPosts = async () => {
        try {
            const res = await axios.get(`/api/posts/${props.match.params.id}`)
            setTitle(res.data.title);
            setContent(res.data.content);
            setTimestamp(res.data.created_at);
            setUsername(res.data.username);
        } catch (err) {
            console.log(err)
        }
    }
    getPosts();
}, [props.match.params.id])

    const deletePost = async (id) => {
        try {
            const res = await axios.delete(`/api/posts/${id}`);
            setPosts(res.data);
        } catch(err) {
            console.log(err);
        };
    };

    return (
        <PostDetail onDelete={deletePost}/>
    );
}

export default PostList;