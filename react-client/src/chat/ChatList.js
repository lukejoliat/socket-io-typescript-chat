import React from 'react';
import {
  Card,
  CardContent,
  List,
  withStyles,
  TextField,
  InputAdornment
} from '@material-ui/core';
import Message from '@material-ui/icons/Message';
import ChatItem from './ChatItem';
const styles = {
  card: {
    height: '100%'
  },
  chatFooterContainer: {
    position: 'fixed',
    bottom: '25px',
    left: '25px',
    right: '25px'
  },
  chatList: {
    overflow: 'auto',
    position: 'fixed',
    top: '90px',
    left: '25px',
    right: '25px',
    bottom: '120px'
  }
};
function Chat(props) {
  const { classes, messages, handleKeyPress } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <List className={classes.chatList}>
          {messages.map((m, idx) => {
            return <ChatItem message={m} key={idx} />;
          })}
        </List>
        <div className={classes.chatFooterContainer}>
          <TextField
            id="standard-name"
            placeholder="Type your message"
            margin="normal"
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Message />
                </InputAdornment>
              )
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(Chat);
