import { useState, useEffect} from 'react';
import axios from 'axios';
import Post from '../PostDetail/PostDetail';


const Feed = (props) => {
const [posts, setPosts] = useState([]);


    const deletePost = async (id) => {
        try {
            const res = await axios.delete(`/api/posts/${id}`);
            setPosts(res.data);
        } catch(err) {
            console.log(err);
        };
    };

    return (
        <Post onDelete={deletePost}/>
    );
}

export default Feed;