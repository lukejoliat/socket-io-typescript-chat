import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  withStyles
} from '@material-ui/core';
import { connect } from 'react-redux';
import React from 'react';
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
    <ListItem
      className={`${
        message.from.id === props.user.id && message.action !== 'JOINED'
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
  );
}
export default withStyles(styles)(ChatItem);
