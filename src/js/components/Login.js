import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import regeneratorRuntime  from 'regenerator-runtime'
import {addUser} from '../actions/index'
import { connect } from "react-redux";


const mapDispatchToProps = dispatch => {
  return {
    addUser: user => dispatch(addUser(user))
  };
};


const mapStateToProps = state =>{
  if(state.users == undefined ||state.users[state.users.length-1] == undefined || state.users.length == 0){
    return{};
  }
  this._logoutUser(state[state.users.length-1].id)
  return { currrentUser: state.users[state.users.length-1]}
}

class Login extends React.Component {
constructor(props){
  super(props);
  this.state={
    username:'',
    image:''
    }
    console.log(props)
    if(props.currrentUser != undefined)
      this._logoutUser(props.currrentUser.id);
 }

 handleClick(event){

  if(this.state.username == undefined || this.state.username == ''){
    alert("Username vacío.")
    return;
  }
  const allUsers = this.props.allUsersQuery.allUsers || [];
  var user = this.findArrayElementByName(allUsers, this.state.username);
  if(user !== undefined){
    //Existe usuario
    if(user.onlineStatus){
      //Ya hay online, no permitir
      alert("Ya esta logeado.")
      // ALERTAR QUE YA HAY ONLINE
    }else{
      //GUARDAR ID EN REDUCER user.id
      this._updateUser(user.id, this.state.image, true).then((res) => {
      }).catch((res) => {
        const errors = res.graphQLErrors.map((error) => {
          console.log(error.code);
          console.log(error.message);
        });
      });  
    }
  }
  else{
    //No existe usuario
    this._createUser(this.state.username, this.state.image).then((res) => {
    }).catch((res) => {
      console.log(res)
      const errors = res.graphQLErrors.map((error) => {
        console.log(error.code);
        console.log(error.message);
      });
    });  

  }
 }

 async _createUser(username, imageurl){
   var result = await this.props.createUserMutation({
    variables: { username, imageurl }
  });
  // console.log(result)
  // console.log("id: " + result.data.createUser.id)
  const id  = result.data.createUser.id
  const name  = result.data.createUser.name
  const image = result.data.createUser.image
  const onlineStatus = result.data.createUser.onlineStatus
  this.props.addUser({id, name, onlineStatus, image});
  window.location = "/#/MainPage"
};

async _updateUser(id, image, onlineStatus){
 var result = await this.props.updateUserMutation({ variables: { id, image, onlineStatus } });
 console.log(result)
 const idResult  = result.data.updateUser.id
  const nameResult  = result.data.updateUser.name
  const imageResult = result.data.updateUser.image
  const onlineStatusResult = result.data.updateUser.onlineStatus
  this.props.addUser({id: idResult,name: nameResult,onlineStatus: onlineStatusResult,image: imageResult});
 window.location = "/#/MainPage"
};

async _logoutUser(id){
 var result = await this.props.logoutUserMutation({ variables: { id } });
};


findArrayElementByName(array, name) {
  return array.find((element) => {
    return element.name === name;
  })
}

render() {
    return (
      <div>
          <AppBar title="Chat" iconStyleLeft={{display:'none'}}/>
        <Card style={{height:'50vh', width:'400px', marginLeft:'auto', marginRight:'auto', marginTop:'2%'}}>
        <CardTitle title="Login" subtitle="Charle con otros usuarios en tiempo real" />
                <CardMedia style={{paddingLeft:35, paddingRight:35}}>
                <TextField
                    hintText="Escriba su nombre de usuario"
                    floatingLabelText="Nombre"
                    onChange = {(event,newValue) => this.setState({username:newValue})}
                    onKeyPress={ (e) => {
                      if (e.key === 'Enter') {
                        this.handleClick(event)
                    }}}
                    />
                    <br/>
                    <TextField
                    hintText="Url de su foto"
                    floatingLabelText="Foto url"
                    onChange = {(event,newValue) => this.setState({image:newValue})}
                    />
                    <br/>
                    <br/>
                    <br/>
                <RaisedButton label="Aceptar" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                </CardMedia>
        </Card>
      </div>
    );
  }
}
const style = {
 margin: 0,
};
const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($username: String!, $imageurl: String) {
    createUser(name: $username, image: $imageurl, onlineStatus: true) {
      id
      name
      image
      onlineStatus
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: ID!, $image: String, $onlineStatus: Boolean) {
    updateUser(id: $id, image: $image, onlineStatus: $onlineStatus) {
      id
      name
      image
      onlineStatus
      createdAt
      updatedAt
    }
  }
`;

const LOGOUT_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: ID!) {
    updateUser(id: $id, onlineStatus: false) {
      id
      name
      image
      onlineStatus
      createdAt
      updatedAt
    }
  }
`;

const ALL_USERS_QUERY = gql`
  query AllUsersQuery {
    allUsers {
      id
      name
      onlineStatus
      image
      createdAt
      updatedAt
    }
  }
`;

const GET_USER_QUERY = gql`
  query GetUserQuery($name: String) {
    User(name: $name){
      id
      name
      onlineStatus
      image
      createdAt
      updatedAt
    }
  }
`;
const LoginConnected = connect( (state) => ({
  currrentUser: state.users && state.users.length != 0 ? state.users[0] : undefined,
}), mapDispatchToProps,)(Login)

export default compose(
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
  graphql(UPDATE_USER_MUTATION, { name: 'updateUserMutation' }),
  graphql(LOGOUT_USER_MUTATION, { name: 'logoutUserMutation' }),
  graphql(ALL_USERS_QUERY, { name: 'allUsersQuery' }),
  graphql(GET_USER_QUERY, { name: 'getUserQuery' })
) (LoginConnected);