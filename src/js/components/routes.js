import React from "react";
import { Route, IndexRoute } from 'react-router-dom'
import App from './App'
import Chat from './Chat';
import Login from './Login';

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Login}/>
        <Route path="Chat" component={Chat}/>
    </Route>
);

export default routes;