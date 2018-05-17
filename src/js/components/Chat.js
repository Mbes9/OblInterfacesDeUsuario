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

const writingSpan ={
  marginTop: 9,
  color: white,
  marginRight:25,
  display:'inline-block'

}


 
class ConnectedChat extends React.Component {

  render(){
     return(
            <MediaQuery query="(min-width: 780px)">
            <Card id="ChatCard" style={{height:'85vh', width:'calc(100% - 320px)', minWidth:'unset !important', float:'right'}}>
              <CardMedia>
        <AppBar title="Nombre del usuario..." iconElementRight={<span style={writingSpan}>Escribiendo...</span>}  id="rightNav" iconElementLeft={<div><MediaQuery query="(max-width:780px)"> <IconButton><NavigationClose /></IconButton></MediaQuery>
            <MediaQuery query="(min-width:780px)"><IconButton><MoreVertIcon /></IconButton></MediaQuery> </div>
            } />
             <List>
                <Subheader>Hoy</Subheader>
                <ListItem
                  leftAvatar={<Avatar src={UserFace} />}
                  primaryText={
                    <p>
                      <span style={{color: darkBlack}}>Cambiamos</span> --
                      Un texto algo largo para que sea algo de testeo de un elemento y chat largo.
                    </p>
                  }
                />
                <Divider inset={true} />
                <ListItem
                  leftAvatar={<Avatar src={UserFace} />}
                  primaryText={
                    <p>
                      <span style={{color: darkBlack}}>Cambiamos</span> --
                      Un texto algo largo para que sea algo de testeo de un elemento y chat largo.
                    </p>
                  }
                />
                <Divider inset={true} />
                <ListItem
                  leftAvatar={<Avatar src={UserFace} />}
                  primaryText="Oui oui"
                />
                <Divider inset={true} />
                <ListItem
                  leftAvatar={<Avatar src={UserFace} />}
                  primaryText={
                    <p>
                      <span style={{color: darkBlack}}>Cambiamos</span> --
                      Un texto algo largo para que sea algo de testeo de un elemento y chat largo.
                    </p>
                  }                

                />
                <Divider inset={true} />
                <ListItem
                  leftAvatar={<Avatar src={UserFace} />}
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
            <Card id="MessageCard" style={{height:'5vh', width:'calc(100% - 320px)', minWidth:'unset !important', float:'right', paddingLeft:'3vw'}}>
                  <CardMedia>
                    <TextField 
                      hintText="Escribe un mensaje aquí"
                        fullWidth={true}
                    />
                  </CardMedia>
                </Card>
            </MediaQuery>
        );
  }
 
}

export default ConnectedChat;