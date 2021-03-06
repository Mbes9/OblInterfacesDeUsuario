import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Redirect} from 'react-router-dom'
import { PropsRoute  } from 'react-router-with-props'
import './App.css';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Login from './Login';
import MainPage from './MainPage'
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';


class App extends React.Component{

  componentDidMount(){
    this._subscribeToNewUsers();
    this._subscribeToUpdatedUsers();
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
              createdAt
              updatedAt
            }
          }
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {

          console.log("nuevo usuario")
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


  _subscribeToUpdatedUsers(){
    this.props.allUsersQuery.subscribeToMore({
      document: gql`
        subscription {
          User(filter: { mutation_in: [UPDATED] }) {
            node {
              id
              name
              onlineStatus
              image
              createdAt
              updatedAt
            }
          }
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
      
    }
    });
  };

  render(){
    const allUsers = this.props.allUsersQuery.allUsers || [];
    
    return(
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <Card style={{height:'90vh', width:'80vw', marginLeft:'10%', marginRight:'10%', marginTop:'2%'}}>
         <CardMedia>
            <Switch>
              <PropsRoute path='/login' component={Login}/>
              <PropsRoute path='/mainPage' component={MainPage} users={allUsers}/>
              <Redirect from="/" to="/login" />
            </Switch>
         </CardMedia>
       </Card>
     
       </MuiThemeProvider>
    );
  }

  MainPageView(users){
    return(
        <MainPage users = {users} />
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