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
import { SMALL } from 'material-ui/utils/withWidth';

const writingSpan ={
  marginTop: 9,
  color: white,
  marginRight:25,
  display:'inline-block'

}


 
class ConnectedChat extends React.Component {

  componentDidMount(){
    this._subscribeToNewMessages();
  }

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
   this.refs.textInput.input.value = "";
  };

  closeChat(){
    var eles = document.getElementsByClassName("ChatClass-Active");
      Array.prototype.forEach.call(eles, function(el){
        el.classList.remove("ChatClass-Active");
        el.classList.add("ChatClass");
      
      });
    var inputEles = document.getElementsByClassName("ChatClass-Active-Input");
    Array.prototype.forEach.call(inputEles, function(ele){
      ele.classList.remove("ChatClass-Active-Input");
      ele.classList.add("ChatClass-Input");
      
      });

  }

  closeChatRender(){
    this.closeChat();
    this.closeChat();
  }

  render(){
    var sender = this.props.loggedUser.name;
    let reciever = "";
    if(document.getElementById("ChatWithId")){
      reciever = document.getElementById("ChatWithId").innerText;
    }

    function ShowMessages(message){
      var id = message.id.toString();
      var origin = message.messageFrom.toString();
      var destination = message.messageTo.toString();
      var text = message.text.toString();
      var date = message.createdAt.toString().substring(0, 10);
      var allign= "";
      if(sender == origin)
        allign == "left"
      if(sender == destination)
        allign == "right"
      return(
          (sender == origin && reciever == destination || sender == destination && reciever == origin) &&
          <ListItem 
            key={id}
            primaryText={
              <p style={{textAlign: {allign}}}>
                <span style={{color: darkBlack}}>{origin}</span> - <span style={{fontSize: 12}}>{date}</span>
              </p>
            }
            secondaryText={
              <p>
                {text}
              </p>
            }
          />
      )
    }

    const allMessages = this.props.allMessagesQuery.allMessages || [];


     return(
      <div>
      <input hidden={true} id="ChatWithId" value=""/>
           <Card  className="ChatClass" style={{height:'82vh', width:'calc(100% - 320px)', minWidth:'unset !important', float:'right'}}>
              <CardMedia>
              <AppBar title={reciever} style={{zIndex:9999}} iconElementRight={<span style={writingSpan}></span>}  id="rightNav" onLeftIconButtonClick={() => this.closeChatRender()} iconElementLeft={<div><MediaQuery query="(max-width:780px)"> <IconButton><NavigationClose /></IconButton></MediaQuery>
            <IconButton><MoreVertIcon /></IconButton></div>
            } />
              <List style={{maxHeight: 'calc(82vh - 64px)',overflowX:'hidden'}}>
                {allMessages.map(message => (ShowMessages(message)))}
              </List>

            

              </CardMedia>
            </Card>
            <Card className="ChatClass ChatClass-Input" id="MessageCard" style={{height:'8vh', width:'calc(100% - 320px)', minWidth:'unset !important', float:'right', paddingLeft:'3vw'}}>
            <CardMedia>
                    <TextField 
                        ref="textInput"
                        hintText="Escribe un mensaje aquí"
                        fullWidth={true}
                        onKeyPress={ (e) => {
                          if (e.key === 'Enter') {
                            if(document.getElementById("ChatWithId").innerText == "1" || this.refs.textInput.input.value.trim() == ""){

                            }else{
                              this._createMessage(sender, document.getElementById("ChatWithId").innerText, this.refs.textInput.input.value);
                        }}}}
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
    createMessage(messageFrom: $messageFrom, messageTo: $messageTo, text: $text) {
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