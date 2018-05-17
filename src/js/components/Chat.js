import React from 'react';
import MediaQuery from 'react-responsive';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import TextField from 'material-ui/TextField';
import { white } from 'material-ui/styles/colors';
import NoPhoto from '../../images/NoPhotoBig.png';
import UserFace from '../../images/UserFace.png';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from "react-redux"; 
import { transparent } from 'material-ui/styles/colors';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import regeneratorRuntime  from 'regenerator-runtime'

const writingSpan ={
  marginTop: 9,
  color: white,
  marginRight:25,
  display:'inline-block'

}


 
class ConnectedChat extends React.Component {
  _subscribeToNewMessages(){
    this.props.allMessagesQuery.subscribeToMore({
      document: gql`
        subscription {
          Message(filter: { mutation_in: [CREATED] }) {
            node {
              id
              text
              messageFrom
              messageTo
              createdAt
            }
          }
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
          const newMessageLinks = [
            ...previous.allMessages,
            subscriptionData.data.Message.node
          ];
          const result = {
            ...previous,
            allMessages: newMessageLinks
          };
          return result;
  
      }
    });
  };


  async _createMessage(messageFrom, messageTo, text){
    var result = await this.props.createMessageMutation({
     variables: { messageFrom, messageTo, text }
   });
  };

  showAux(){
    console.log(this.props.loggedUser)
  }

  render(){
    var createUser = this.props.loggedUser;
    console.log(createUser)
    if(document.getElementById("ChatWithId"))
      console.log(document.getElementById("ChatWithId").innerText)
    const allMessages = this.props.allMessagesQuery.allMessages || [];
     return(
       <div className="ChatClass" id="ChatId">
       <input hidden={true} id="ChatWithId" value=""/>
            <Card id="ChatCard" className="ChatClass" style={{height:'82vh', width:'calc(100% - 320px)', minWidth:'unset !important', float:'right'}}>
              <CardMedia>
        <AppBar title="Nombre del usuario..." iconElementRight={<span style={writingSpan}>Escribiendo...</span>}  id="rightNav" iconElementLeft={<div><MediaQuery query="(max-width:780px)"> <IconButton><NavigationClose /></IconButton></MediaQuery>
            <IconButton><MoreVertIcon /></IconButton></div>
            } />
             <List style={{maxHeight: 'calc(82vh - 64px)',overflowX:'hidden'}}>
                <Subheader>Hoy</Subheader>
                <ListItem
                  onClick ={() => this.showAux()}
                  leftAvatar={<Avatar style={{backgroundColor:transparent}} src={UserFace} />}
                  primaryText={
                    <p>
                      <span style={{color: darkBlack}}>Cambiamos</span> --
                      Un texto algo largo para que sea algo de testeo de un elemento y chat largo.
                    </p>
                  }
                />
                <Divider inset={true} />
                <ListItem
                  leftAvatar={<Avatar style={{backgroundColor:transparent}} src={UserFace} />}
                  primaryText={
                    <p>
                      <span style={{color: darkBlack}}>Cambiamos</span> --
                      Un texto algo largo para que sea algo de testeo de un elemento y chat largo.
                    </p>
                  }
                />
                <Divider inset={true} />
                <ListItem
                  leftAvatar={<Avatar style={{backgroundColor:transparent}} src={UserFace} />}
                  primaryText="Oui oui"
                />
                <Divider inset={true} />
                <ListItem
                  leftAvatar={<Avatar style={{backgroundColor:transparent}} src={UserFace} />}
                  primaryText={
                    <p>
                      <span style={{color: darkBlack}}>Cambiamos</span> --
                      Un texto algo largo para que sea algo de testeo de un elemento y chat largo.
                    </p>
                  }                

                />
                <Divider inset={true} />
                <ListItem
                  leftAvatar={<Avatar style={{backgroundColor:transparent}} src={UserFace} />}
                  primaryText={
                    <p style={{'lineHeight':23}}>
                      <span style={{color: darkBlack}}>Cambiamos</span> --
                      Un texto algo largo para que sea algo de testeo de un elemento y chat largo.
                      Un texto algo largo para que sea algo de testeo de un elemento y chat largo.
                      Un texto algo largo para que sea algo de testeo de un elemento y chat largo.
                      Un texto algo largo para que sea algo de testeo de un elemento y chat largo.
                    </p>
                  }
                />
              </List>

              </CardMedia>
            </Card>
            <Card id="MessageCard" style={{height:'8vh', width:'calc(100% - 320px)', minWidth:'unset !important', float:'right', paddingLeft:'3vw'}}>
                  <CardMedia>
                    <TextField 
                      hintText="Escribe un mensaje aquí"
                        fullWidth={true}
                    />
                  </CardMedia>
                </Card>
                </div>
        );
  }
 
}

const ALL_MESSAGES_QUERY = gql`
  query AllMessagesQuery {
    allMessages (orderBy: createdAt_DESC){
      id
      text
      messageFrom
      messageTo
      createdAt
    }
  }
`;

const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessageMutation($messageFrom: String!, $messageTo: String!, $text: String!) {
    createUser(messageFrom: $messageFrom, messageTo: $messageTo, text: text) {
      id
      text
      messageFrom
      messageTo
      createdAt
    }
  }
`;

const mapStateToProps = state =>{
  if( state.users == undefined ||state.users[state.users.length-1] == undefined || state.users.length == 0){
    window.location = "#/Login";
    return{};
  }
  return { loggedUser: state.users[state.users.length-1]}
}

const Chat = connect(mapStateToProps)(ConnectedChat)


export default compose(
  graphql(ALL_MESSAGES_QUERY, { name: 'allMessagesQuery' }),
  graphql(CREATE_MESSAGE_MUTATION, { name:'createMessageMutation' })
)(Chat);