import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  withStyles
} from '@material-ui/core';
import React from 'react';
import { UserContext } from '../App';
const styles = {
  notificationName: {
    margin: 0
  },
  currentUser: {
    marginTop: '2px',
    marginBottom: '2px',
    borderRadius: '5px',
    backgroundColor: '#E8EAF6'
  },
  joinedNotification: {
    justifyContent: 'center'
  }
};
function ChatItem(props) {
  const { classes, message } = props;
  return (
    <UserContext.Consumer>
      {user => (
        <ListItem
          className={`${
            message.from.id === user.id && message.action !== 'JOINED'
              ? classes.currentUser
              : null
          } ${message.action === 'JOINED' ? classes.joinedNotification : null}`}
        >
          {message.action === 'JOINED' && (
            <p>
              <span>
                <b>{message.from.name}</b> joined to the conversation.
              </span>
            </p>
          )}
          {message.action === undefined && (
            <React.Fragment>
              <ListItemAvatar>
                <Avatar alt="avatar" src={message.from.avatar} />
              </ListItemAvatar>
              <ListItemText>
                <h4 className={classes.notificationName}>
                  <b>{message.from.name}</b>
                </h4>
                <span> {message.content} </span>
              </ListItemText>
            </React.Fragment>
          )}
        </ListItem>
      )}
    </UserContext.Consumer>
  );
}
export default withStyles(styles)(ChatItem);
