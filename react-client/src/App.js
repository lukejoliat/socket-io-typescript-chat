import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import WebIcon from '@material-ui/icons/Web';
import PersonIcon from '@material-ui/icons/Person';
import CodeIcon from '@material-ui/icons/Code';
import Drawer from '@material-ui/core/Drawer';
import { ListItem, ListItemText, ListItemIcon, List } from '@material-ui/core';
import ChatList from './chat/ChatList';
import FormDialog from './dialog/Dialog';
import SocketService from './socket/SocketService';
import { getRandomId } from './utils/utils';

const styles = {
  root: {
    width: '100%'
  },
  flex: {
    flex: 1
  },
  appContent: {
    position: 'fixed',
    height: '100%',
    width: '100%'
  },
  listItemText: {
    textAlign: 'center'
  }
};

export const UserContext = React.createContext({});
class App extends React.PureComponent {
  state = {
    drawerIsOpen: false,
    dialogIsOpen: true,
    messages: [],
    dialogInputValue: ``
  };
  constructor() {
    super();
    SocketService.onMessage().subscribe(data => {
      this.setState({ messages: [...this.state.messages, data] });
    });
    this.user = {};
  }

  toggleDrawer = () =>
    this.setState({ drawerIsOpen: !this.state.drawerIsOpen });

  toggleDialog = e => {
    if (e) {
      this.user = {
        id: getRandomId(),
        name: e,
        avatar: `https://api.adorable.io/avatars/285/${getRandomId()}.png`
      };
      this.sendNotification('JOINED');
    }
    this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
  };

  sendMessage = e => {
    if (e.key === 'Enter' && e.target.value) {
      SocketService.send({
        from: this.user,
        content: e.target.value
      });
      e.target.value = ``;
    }
  };

  handleDialogKeyup = val => this.setState({ dialogInputValue: val });

  handleSubmit = () => this.toggleDialog(this.state.dialogInputValue);

  sendNotification(action) {
    let message;
    if (action === 'JOINED') {
      message = {
        from: this.user,
        action: action
      };
    }
    SocketService.send(message);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon onClick={this.toggleDrawer} />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Typescript Chat
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          open={this.state.drawerIsOpen}
          variant="temporary"
          onBackdropClick={this.toggleDrawer}
        >
          <List component="nav">
            <ListItem button>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Author" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <CodeIcon />
              </ListItemIcon>
              <ListItemText primary="Source Code" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <WebIcon />
              </ListItemIcon>
              <ListItemText primary="Blog Post" />
            </ListItem>
          </List>
        </Drawer>
        <div className={classes.appContent}>
          <UserContext.Provider value={this.user}>
            <ChatList
              messages={this.state.messages}
              handleKeyPress={this.sendMessage}
            />
          </UserContext.Provider>
        </div>
        {this.state.dialogIsOpen && (
          <FormDialog
            toggleDialog={this.toggleDialog}
            handleDialogKeyup={this.handleDialogKeyup}
            handleSubmit={this.handleSubmit}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(App);
