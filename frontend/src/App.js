import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import { MuiThemeProvider } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import theme from './theme';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        height: 600,
        marginTop: 0,
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarOpen: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    drawerLogo: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexGrow: 1,
        padding: '0 8px'
    },
    content: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            content: {
                height: 'calc(100% - 64px)',
                marginTop: 64,
            },
        },
        marginLeft: -drawerWidth
    },
    contentOpen: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0
    }
});

export const menuItems = (
    <div>
        <ListItem button>
            <ListItemText primary="Category 1" />
        </ListItem>
        <ListItem button>
            <ListItemText primary="Category 2" />
        </ListItem>
        <ListItem button>
            <ListItemText primary="Category 3" />
        </ListItem>
    </div>
);

class App extends React.Component {
    state = {
        open: false,
        anchor: 'left',
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const { anchor, open } = this.state;
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <div className={classes.appFrame}>
                        <AppBar
                            className={classNames(classes.appBar, {
                                [classes.appBarOpen]: open
                            })}
                        >
                            <Toolbar disableGutters={!open}>
                                <IconButton
                                    color="contrast"
                                    aria-label="open drawer"
                                    onClick={this.handleDrawerOpen}
                                    className={classNames(classes.menuButton, open && classes.hide)}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography type="title" color="inherit" noWrap>
                                    App Title
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Drawer
                            type="persistent"
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            anchor={anchor}
                            open={open}
                        >
                            <div className={classes.drawerInner}>
                                <div className={classes.drawerHeader}>
                                    <h2 className={classes.drawerLogo}>App Title</h2>
                                    <IconButton onClick={this.handleDrawerClose}>
                                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                    </IconButton>
                                </div>
                                <Divider />
                                <List className={classes.list}>{menuItems}</List>
                            </div>
                        </Drawer>

                        <main
                            className={classNames(classes.content, {
                                [classes.contentOpen]: open
                            })}
                        >
                        </main>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);