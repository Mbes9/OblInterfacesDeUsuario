import React,  {Component}  from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import NoPhoto from '../../images/NoPhotoBig.png'
import NoPhotoWhite from '../../images/NoPhotoWhite.png'
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { transparent } from 'material-ui/styles/colors';
import {addUserToChat} from '../actions/index'
 
let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static get propTypes() {
      return{
        children: PropTypes.node.isRequired,
        defaultValue: PropTypes.number.isRequired,
      }
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange(event,index) {
      var eles = document.getElementsByClassName("ChatClass")
      Array.prototype.forEach.call(eles, function(el){
        console.log(el.classList)
        el.classList.remove("ChatClass");
        el.classList.add("ChatClass-Active");
        console.log(el.classList)
      
      })
      this.setState({
        selectedIndex: index,
      });
      console.log("importante")
      console.log(this.props) // usuario a chatear
      if(this.props.loggedUser)
        this.props.loggedUser.chatWith = this.state.selectedIndex

    };

    render() {
      console.log(this.state.selectedIndex) // usuario a chatear
      if(document.getElementById("ChatWithId") != undefined)
        document.getElementById("ChatWithId").innerText = this.state.selectedIndex
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange.bind(this)}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

function handleLogout(){
  window.location = "#/Login"
}

SelectableList = wrapState(SelectableList);

const mapStateToProps = state =>{
  if( state.users == undefined ||state.users[state.users.length-1] == undefined || state.users.length == 0){
    window.location = "#/Login";
    return{};
  }
  console.log(state);
  return { loggedUser: state.users[state.users.length-1]}
}

const UsersList = ({users, loggedUser}) => (
    <Card id="UsersCard" style={{ width:'320px', minWidth:'320px !important', float:'left'}}>
    <CardMedia>
      <AppBar title={loggedUser ? loggedUser.name : ""} id="leftNav" iconElementRight={<FlatButton label="Salir" onClick={() => handleLogout()} />} iconElementLeft={<Avatar style={{backgroundColor:transparent}} src={loggedUser && loggedUser.image ? loggedUser.image : NoPhotoWhite}/>}/>
      <div style={{maxHeight: 'calc(90vh - 64px)',overflowX:'hidden',}}>
        <SelectableList defaultValue={1}>
          <Subheader>Usuarios</Subheader>
          {users.map(user => (ConnectedUsers(user)
          ))}
        </SelectableList>
        <Divider />
        <List>
          <Subheader>Desconectados</Subheader>
          {users.map(user => (DisconnectedUsers(user)
          ))}
        </List>
      </div>
    </CardMedia>
  </Card>
);

function ConnectedUsers(user){
  return(
       user.onlineStatus &&
        <ListItem 
        key={user.id}
        value={user.name}
        primaryText={user.name}
        leftAvatar={<Avatar style={{backgroundColor:transparent}} src={user.image ? user.image : NoPhoto} />}
        rightIcon={<CommunicationChatBubble />}
      />
  )
}

function DisconnectedUsers(user){
  return(
       !user.onlineStatus &&
        <ListItem 
        key={user.id}
        primaryText={user.name}
        leftAvatar={<Avatar style={{backgroundColor:transparent}} src={user.image ? user.image : NoPhoto} />}
      />
  )
}


const ConnectedUsersList = connect(mapStateToProps)(SelectableList)

export default UsersList;