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
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
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

SelectableList = wrapState(SelectableList);

const UsersList = ({users}) => (
    <Card id="UsersCard" style={{ width:'320px', minWidth:'320px !important', float:'left'}}>
    <CardMedia>
      <AppBar title="Usuarios" id="leftNav"   />
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
    <div>
      { user.onlineStatus &&
        <ListItem 
        key={user.id}
        value={user.id}
        primaryText={user.name}
        leftAvatar={<Avatar src={user.image ? user.image : NoPhoto} />}
        rightIcon={<CommunicationChatBubble />}
      />
      }
    </div>
  )
}

function DisconnectedUsers(user){
  return(
    <div>
      { !user.onlineStatus &&
        <ListItem 
        key={user.id}
        primaryText={user.name}
        leftAvatar={<Avatar src={user.image ? user.image : NoPhoto} />}
      />
      }
    </div>
  )
}
 
export default UsersList;