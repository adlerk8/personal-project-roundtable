import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const ContentInput = styled.input`
    height: 300px;
`

const TitleInput = styled.input`
    font-family: 'Hammersmith One', sans-serif;
`

const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const InputFields = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    min-width: 800px;
    font-family: 'Cantarell', sans-serif;
`

const Button = styled.button`
    border-color: #010F20;
    border-width: 2px;
    font-family: 'Hammersmith One', sans-serif;
    font-size: 14px;
    color: white;
    background-color: #987381;
    margin: 7px;
    padding: 3px 5px 3px 5px;
`
const CancelButton = styled.button`
    border-color: #010F20;
    border-width: 2px;
    font-family: 'Hammersmith One', sans-serif;
    font-size: 14px;
    color: white;
    background-color: #465362;
    margin: 7px;
    padding: 3px 5px 3px 5px;
`

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const history = useHistory();

    const addPost = async () => {
        try {
            await axios.post('/api/post', {title, content});
            history.push('/home')
        } catch(err) {
            console.log(err)
        }
    };

    return (
        <InputBox>
            <InputFields>
                <TitleInput 
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <ContentInput
                    type="text"
                    placeholder="Start writing here..."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
            </InputFields>
            <div>
                <CancelButton>
                    <Link to="/home">Cancel</Link>
                </CancelButton>
                <Button onClick={addPost}>
                    Post
                </Button>
            </div>
        </InputBox>
    );
}

export default NewPost;