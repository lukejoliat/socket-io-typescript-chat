import React from 'react';
import {
  Card,
  Fab,
  CardContent,
  List,
  ListItemText,
  ListItem,
  withStyles,
  TextField,
  InputAdornment
} from '@material-ui/core';
import Message from '@material-ui/icons/Message';
import AddIcon from '@material-ui/icons/Add';
import SocketService from '../socket/SocketService';
import FormDialog from '../dialog/Dialog';
const styles = {
  fab: {
    position: 'absolute',
    top: 35,
    right: 20
  },
  listItemText: {
    textAlign: 'center'
  }
};
class Chat extends React.Component {
  constructor() {
    super();
    this.sendMessage = this.sendMessage.bind(this);
    this.user = {
      id: 1,
      name: 'Luke',
      avatar: `https://api.adorable.io/avatars/285/${this.getRandomId()}.png`
    };
    SocketService.onMessage().subscribe(data => {
      this.setState({ messages: [...this.state.messages, data] });
    });
  }
  state = { messages: [], dialog: true };
  render() {
    const { classes } = this.props;
    return (
      <Card>
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={this.toggleDialog}
        >
          <AddIcon />
        </Fab>
        <CardContent>
          <List>
            {this.state.messages.map((m, idx) => {
              if (m.action === 'JOINED') {
                return (
                  <ListItem key={idx}>
                    <span>{m.from.name} joined to the conversation. </span>
                  </ListItem>
                );
              }
              return (
                <ListItem key={idx}>
                  <ListItemText primary={m.content} />
                </ListItem>
              );
            })}
          </List>
          <div className="chat-footer-container">
            <TextField
              id="standard-name"
              placeholder="Type your message"
              margin="normal"
              onKeyPress={this.sendMessage}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Message />
                  </InputAdornment>
                )
              }}
            />
          </div>
          {this.state.dialog && <FormDialog toggleDialog={this.toggleDialog} />}
        </CardContent>
      </Card>
    );
  }
  toggleDialog = e => {
    if (e) {
      this.user.name = e;
      this.sendNotification({}, 'JOINED');
    }
    this.setState({ dialog: !this.state.dialog });
  };
  sendMessage(e) {
    if (e.key === 'Enter' && e.target.value) {
      SocketService.send({
        from: this.user,
        content: e.target.value
      });
      e.target.value = ``;
    }
  }

  sendNotification(params, action) {
    let message;

    if (action === 'JOINED') {
      message = {
        from: this.user,
        action: action
      };
    } else if (action === 'RENAME') {
      message = {
        action: action,
        content: {
          username: this.user.name,
          previousUsername: params.previousUsername
        }
      };
    }

    SocketService.send(message);
  }
  getRandomId() {
    return Math.floor(Math.random() * 1000000) + 1;
  }
}

export default withStyles(styles)(Chat);
