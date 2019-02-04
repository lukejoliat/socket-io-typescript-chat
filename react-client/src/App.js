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
import Chat from './chat/Chat';

const styles = {
  root: {
    width: '100%'
  },
  flex: {
    flex: 1
  },
  menuButton: {},
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px'
  },
  fab: {
    position: 'absolute',
    top: 35,
    right: 20
  }
};

class App extends React.Component {
  state = { drawerIsOpen: false };

  handleDrawerOpen = () => {
    this.setState({ drawerIsOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ drawerIsOpen: false });
  };

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
              <MenuIcon onClick={this.handleDrawerOpen} />
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
          onBackdropClick={this.handleDrawerClose}
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
        <div className="app-content">
          <Chat />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
