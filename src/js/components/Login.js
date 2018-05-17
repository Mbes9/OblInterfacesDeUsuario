import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import regeneratorRuntime  from 'regenerator-runtime'
class Login extends React.Component {
constructor(props){
  super(props);
  this.state={
    username:'',
    image:''
    }
 }

handleClick(event){
 
  this._createUser(this.state.username, this.state.image).catch((res) => {
    const errors = res.graphQLErrors.map((error) => {
      console.log(error.code);
      console.log(error.message);
    });
  });

 }

 async _createUser(name, image){
   var result = await this.props.createUserMutation({
    variables: { name, image }
  });
  console.log(result)
  console.log("id: " + result.data.createUser.id)
};

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
  mutation CreateUserMutation($name: String!, $image: String) {
    createUser(name: $name, image: $image, onlineStatus: true) {
      id
      name
      image
      onlineStatus
    }
  }
`;

export default compose(
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' })
) (Login);