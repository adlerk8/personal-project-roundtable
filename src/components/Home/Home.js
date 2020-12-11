import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostDetail from '../PostDetail/PostDetail';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [userposts, setUserposts]= useState(true);
    const { id } = useParams();
    
    useEffect(() => {
        const getPosts = async (id) => {
            try {
                const res = await axios.get(`/api/post/${id}`)
                setPosts(res.data)
            } catch (err) {
                console.log(err)
            }
        };
        getPosts();
    })

    const mappedPosts = posts.map((post, index) => {
        return (
            <PostDetail key={post.id-index}/>
        )
    })

    return (
        <div>
            <div>Search Bar</div>
            <div>{mappedPosts}</div>
            <h2>Write without fear. Edit without mercy.</h2>
        </div>
    )
}

export default Home;