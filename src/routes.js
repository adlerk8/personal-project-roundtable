import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import PostDetail from './components/PostDetail/PostDetail';
import NewPost from './components/NewPost/NewPost';
import Feed from './components/Feed/Feed';

export default (
    <Switch>
        <Route exact path="/" component={Auth}/>
        <Route path="/home" component={Home}/>
        <Route path="/post/post:id" component={PostDetail}/>
        <Route path="/newpost" component={NewPost}/>
        <Route path="/feed" component={Feed}/>
    </Switch>
);
