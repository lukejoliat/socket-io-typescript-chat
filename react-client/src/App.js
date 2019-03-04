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
import ChatList from './components/chat/ChatList';
import FormDialog from './components/dialog/Dialog';
import SocketService from './socket/SocketService';
import { getRandomId } from './utils/utils';
import {
  openDrawer,
  closeDrawer,
  closeDialog,
  createUser,
  sendMessage
} from './actions/index';
import { connect } from 'react-redux';
function mapStateToProps(state) {
  return {
    messages: state.messages,
    user: state.user,
    drawerIsOpen: state.drawerIsOpen,
    dialogIsOpen: state.dialogIsOpen
  };
}
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

class App extends React.PureComponent {
  constructor() {
    SocketService.onMessage().subscribe(data => {
      this.props.dispatch(sendMessage(data));
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.user.id !== prevProps.user.id)
      this.sendNotification('JOINED');
  }
  toggleDrawer() {
    this.props.drawerIsOpen === false
      ? this.props.dispatch(openDrawer())
      : this.props.dispatch(closeDrawer());
  }
  closeDialog(e) {
    const user = {
      id: getRandomId(),
      name: e,
      avatar: `https://api.adorable.io/avatars/285/${getRandomId()}.png`
    };
    this.props.dispatch(closeDialog());
    this.createUser(user);
  }
  createUser(user) {
    this.props.dispatch(createUser(user));
  }
  sendMessage(e) {
    const { key, target } = e;
    if (key === 'Enter' && target.value) {
      SocketService.send({
        from: this.props.user,
        content: target.value
      });
      target.value = ``;
    }
  }
  handleSubmit(val) {
    this.closeDialog(val);
  }
  sendNotification(action) {
    let message;
    if (action === 'JOINED') {
      message = {
        from: this.props.user,
        action
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
              onClick={this.toggleDrawer}
            >
              <MenuIcon />
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
          open={this.props.drawerIsOpen}
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
          <ChatList
            messages={this.props.messages}
            handleKeyPress={this.sendMessage}
            user={this.props.user}
          />
        </div>
        {this.props.dialogIsOpen && (
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

export default withStyles(styles)(connect(mapStateToProps)(App));
