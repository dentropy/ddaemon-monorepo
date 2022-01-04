import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Context } from '../Provider';
import {KeybaseControlsSelectTeam} from './keybase-binding/KeybaseControlsSelectTeam';
import KeybaseQuerySelect from './keybase-binding/KeybaseQuerySelect';
import KeybaseControlsCheckWhoPosted from './keybase-binding/KeybaseControlsCheckWhoPosted';
import {KeybaseControlsSelectTopic} from './keybase-binding/KeybaseControlsSelectTopic';
import {KeybaseControlsSelectUser} from './keybase-binding/KeybaseControlsSelectUser';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const [state, dispatch] = React.useContext(Context);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [dashboardSelect, SetDashboardSelect] = React.useState(<h1>Leading</h1>);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setAndHandleClose = (param) => {
    dispatch({ type: "DASHBOARD_SELECT", payload: param})
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [openRight, setOpenRight] = React.useState(false);

  const handleDrawerOpenRight = () => {
    setOpenRight(true);
  };

  const handleDrawerCloseRight = () => {
    setOpenRight(false);
  };

  React.useEffect(() => {
    let menu_list = []
    console.log("MENULIST")
    Object.keys(state.supported_bindings).forEach((thingy) => {
      console.log("MENULIST")
      menu_list.push( <>
                        <MenuItem 
                          onClick={() => { setAndHandleClose(thingy)}}
                          disabled={state.supported_bindings[thingy]}
                        >
                          {thingy}
                        </MenuItem>
                        <br />
                      </>)
    })
    SetDashboardSelect(menu_list)
  }, [])

  const dashboardAppBar = (param) => {
    switch(param) {
      case 'keybase':
        return <Typography variant="h6" noWrap component="div">
            &emsp;keybase binding
          </Typography>;
      case 'discord':
        return <Typography variant="h6" noWrap component="div">
        &emsp;Discord binding
      </Typography>;;
      case 'matrix':
        return <h1>Matrix AppBar</h1>;
      case 'IRC':
        return <h1>IRC AppBar</h1>;
      default:
        return 'foo';
    }
  }
  // const dashboardSideBarLeft = (param) => {
  //   switch(param) {
  //     case 'keybase':
  //       return <>
  //         <KeybaseControlsSelectTeam />
  //         <KeybaseControlsSelectTopic />
  //         <KeybaseControlsSelectUser />
  //         <p />
  //         <KeybaseQuerySelect /> </>
  //     case 'discord':
  //       return <h1>Discord AppBar</h1>;
  //     case 'matrix':
  //       return <h1>Matrix AppBar</h1>;
  //     case 'IRC':
  //       return <h1>IRC AppBar</h1>;
  //     default:
  //       return 'foo';
  //   }
  // }
  
  // const dashboardSideBarRight = (param) => {
  //   switch(param) {
  //     case 'keybase':
  //       return <>
  //         {renderGraphControls(state.data_viz_controls)}
  //       </>;
  //     case 'discord':
  //       return <h1>Discord AppBar</h1>;
  //     case 'matrix':
  //       return <h1>Matrix AppBar</h1>;
  //     case 'IRC':
  //       return <h1>IRC AppBar</h1>;
  //     default:
  //       return 'foo';
  //   }
  // }

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" noWrap component="div">
            NSA as a Service
          </Typography>
          {dashboardAppBar(state.dashboard_select)}
          <Box sx={{ flexGrow: 1 }} />

          
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {dashboardSelect}
              </Menu>
            </div>
          )}

          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpenRight}
            edge="end"
          >
            <MenuIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>



      {/* <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        {dashboardSideBarLeft(state.dashboard_select)}
      </Drawer>



      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="right"
        open={openRight}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerCloseRight} sx={{ textAlign: 'left' }}>
             <ChevronRightIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        {dashboardSideBarRight(state.dashboard_select)}
      </Drawer> */}



      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}