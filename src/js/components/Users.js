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
    <Card id="UsersCard" style={{height:'90vh', width:'320px', minWidth:'320px !important', float:'left'}}>
    <CardMedia>
      <AppBar title="Mi chat" id="leftNav"   />
    <SelectableList defaultValue={1}>
      <Subheader>Usuarios</Subheader>
      {users.map(user => (
        <ListItem 
        key={user.id}
        value={user.id}
        primaryText={user.name}
        leftAvatar={<Avatar src={user.image ? user.image : NoPhoto} />}
        rightIcon={<CommunicationChatBubble />}
      />
      ))}
    </SelectableList>
    <Divider />
    <List>
      <Subheader>Desconectados</Subheader>
      <ListItem
        primaryText="Usuario 6"
        leftAvatar={<Avatar src={NoPhoto} />}
      />
      <ListItem
        primaryText="Usuario 7"
        leftAvatar={<Avatar src={NoPhoto} />}
      />
    </List>
    </CardMedia>
  </Card>
);
 
export default UsersList;