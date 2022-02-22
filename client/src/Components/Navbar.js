import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BugReportIcon from '@material-ui/icons/BugReport';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Footer from './Footer';
import { logOut } from '../Redux/Helpers/authHelper';
import {useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor : "#42adff"
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    navbarIcons: {
        marginLeft: 'auto',
    },
    footer : {
        position : 'fixed',
        left : 0,
        bottom : 0,
        width : "100%",
        backgroundColor : "#42adff",
        height : "150px"
    },
    text : {
        color : "black",
    }
}));

const Navbar = ({ children }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const nevigate = useNavigate();
    const user = useSelector((state) => state.authReducer);

    useEffect(() => {
        console.log(user);
        if (user.jwtToken === "") {
            nevigate("/signin", {replace : true});
        }
    }, [])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogOut = () => {
        logOut();
        nevigate('/signin', {replace : true});
    }

    return (
        <>
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                
            >
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap className={classes.text}>
                        Dashboard
                    </Typography>
                    <div className={classes.navbarIcons}>
                        <IconButton>
                            <AccountCircleIcon />
                        </IconButton>
                        <IconButton>
                            <PowerSettingsNewIcon onClick={handleLogOut}/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button key="Projects">
                        <ListItemIcon><AssignmentIcon /></ListItemIcon>
                        <ListItemText primary="Projects" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button key="Bugs">
                        <ListItemIcon><BugReportIcon /></ListItemIcon>
                        <ListItemText primary="Bugs" />
                    </ListItem>
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {
                    children
                }
            </main>
        </div>
        <div className={classes.footer}>
            <Footer />
        </div>
        </>
    );
}

export default Navbar