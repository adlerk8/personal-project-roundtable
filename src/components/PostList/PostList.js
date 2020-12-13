import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';


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

    // const editPost = async (id, title, content) => {
    //     try {
    //         const res = await axios.put(`/api/posts/${id}`, {title, content});
    //         setTitle(res.data.title);
    //         setContent(res.data.content); 
    //     } catch(err) {
    //         console.log(err)
    //     }
    // };

    const mappedPosts = posts.map((post) => {
        return (
            <div key={post.id}>
                <div className="postInfo">
                    <h3>Date: {post.created_at}</h3>
                    <h2>Title: {post.title}</h2>
                    <h2>By: {post.username}</h2>
                    {/* {props.user.id === post.writer_id ? 
                         <button onClick={() => editPost(post.id)}>Edit</button>
                    :
                        null
                    } */}
                </div>
                <div className="postContent">
                    {props.user.id === post.writer_id ? 
                        <button onClick={() => deletePost(+post.id)}>Delete</button>
                    :
                        null
                    }                    
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

const mapStateToProps = state => state;

export default connect(mapStateToProps)(PostList);