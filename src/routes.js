import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './components/Auth/Auth';
import PostList from './components/PostList/PostList';
import NewPost from './components/NewPost/NewPost';
import MyPosts from './components/MyPosts/MyPosts';
import PostDetail from './components/PostDetail/PostDetail';

export default (
    <Switch>
        <Route exact path="/" component={Auth}/>
        <Route path="/home" component={PostList}/>
        <Route path="/post/:postid" component={PostDetail}/>
        <Route path="/newpost" component={NewPost}/>
        <Route path="/myposts" component={MyPosts}/>
    </Switch>
);
