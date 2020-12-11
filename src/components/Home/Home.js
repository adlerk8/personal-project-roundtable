import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostList from '../PostList/PostList';
import { connect } from 'react-redux';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [userposts, setUserposts]= useState(false);
    const [search, setSearch] = useState('');
    const { id } = useParams();
    
    useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await axios.get(`/api/posts/${id}`)
                setPosts(res.data)
            } catch (err) {
                console.log(err)
            }
        };
        getPosts();
    }, [])

    return (
        <div>
            <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <PostList/>
            <h2>Write without fear. Edit without mercy.</h2>
        </div>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Home);