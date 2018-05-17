import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import UsersList from './Users'
import Chat from './Chat'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Login from './Login';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class App extends React.Component{

  componentDidMount(){
    this._subscribeToNewUsers();
  }

  _subscribeToNewUsers(){
    this.props.allUsersQuery.subscribeToMore({
      document: gql`
        subscription {
          User(filter: { mutation_in: [CREATED] }) {
            node {
              id
              name
              onlineStatus
              image
            }
          }
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
        const newUserLinks = [
          ...previous.allUsers,
          subscriptionData.data.User.node
        ];
        const result = {
          ...previous,
          allUsers: newUserLinks
        };
        return result;
      }
    });
  };

  render(){
    const allUsers = this.props.allUsersQuery.allUsers || [];
    
    return(
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <Card style={{display:'table',height:'90vh', width:'80vw', marginLeft:'10%', marginRight:'10%', marginTop:'2%'}}>
         <CardMedia>
          {/* <UsersList users={allUsers}/>
          <Chat/> */}
          <Login/>
         </CardMedia>
       </Card>
     
       </MuiThemeProvider>
    );
  }

}

const ALL_USERS_QUERY = gql`
  query AllUsersQuery {
    allUsers {
      id
      name
      onlineStatus
      image
    }
  }
`;



export default compose(
  graphql(ALL_USERS_QUERY, { name: 'allUsersQuery' })
)(App);