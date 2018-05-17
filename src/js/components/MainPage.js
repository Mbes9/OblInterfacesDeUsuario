import React,  {Component}  from 'react';
import './App.css';
import UsersList from './Users'
import Chat from './Chat'


const MainPage = ({users}) => (
    <div>
        <UsersList users={users}/> 
        <Chat/>
    </div>
);



export default MainPage;