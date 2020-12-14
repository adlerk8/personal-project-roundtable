import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';


const MyPosts = (props) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getMyPosts = async () => {
            try {
                const res = await axios.get('/api/myposts/');
                setPosts(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        getMyPosts();
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
    });

    return (
        <div>
            {mappedPosts}
        </div>
    );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(MyPosts);