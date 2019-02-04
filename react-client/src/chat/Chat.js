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
  }
  state = { messages: [] };
  render() {
    const { classes } = this.props;
    return (
      <Card>
        <Fab color="primary" aria-label="Add" className={classes.fab}>
          <AddIcon />
        </Fab>
        <CardContent>
          <List>
            <ListItem>
              <ListItemText className={classes.listItemText}>
                Luke has joined the chat.
              </ListItemText>
            </ListItem>
            {this.state.messages.map((m, idx) => (
              <ListItem key={idx}>
                <ListItemText primary={m} />
              </ListItem>
            ))}
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
        </CardContent>
      </Card>
    );
  }

  sendMessage(e) {
    if (e.key === 'Enter' && e.target.value) {
      this.setState({ messages: [e.target.value, ...this.state.messages] });
      this.socketService.send({
        from: 'luke',
        content: e.target.value
      });
      e.target.value = ``;
    }
  }
}

export default withStyles(styles)(Chat);
