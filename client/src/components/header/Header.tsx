import * as React from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Avatar,
} from '@material-ui/core';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import './Header.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import { DEFAULT_LOGGED_IN_ROUTE } from '../../constants/Defaults';
import SideDrawer from '../side-drawer/SideDrawer';
import Notifications from '@material-ui/icons/Notifications';
import UserSession from '../../models/UserSession';
import { setDrawerOpen } from '../../redux/actions/drawer';
import { bindActionCreators } from 'redux';

interface IHeader {
  readonly isLoggedIn: boolean;
  readonly user: UserSession;
  readonly open: boolean;
  readonly setDrawerOpen: typeof setDrawerOpen;
}

const Header = (props: IHeader) => {
  const { user, isLoggedIn, setDrawerOpen, open } = props;
  const [openMenu, setOpenMenu] = React.useState(false);

  function handleOpenDrawer() {
    setDrawerOpen(!open);
  }

  const handleToggle = () => {
    setOpenMenu(!openMenu);
  };

  const handleClose = (event) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    setOpenMenu(false);
  };

  const handleCloseLogout = (event) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    setDrawerOpen(false);
    setOpenMenu(false);
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    const first = Array.from(parts[0])[0].toUpperCase();
    const second = parts.length > 1
      ? Array.from(parts[1])[0].toUpperCase()
      : '';
    return `${first}${second}`;
  };

  return (
  <div>
    <AppBar
      classes={{
        positionSticky: 'top-bar',
      }}
      position='sticky'
      color='secondary'
      elevation={1}
    >
      <Toolbar
        classes={{
          root: 'menu-content',
        }}
      >
        <div
          className='header-left-title-group'
        >
          {
            isLoggedIn
              ? <IconButton
                  color='inherit'
                  aria-label='Open drawer'
                  onClick={handleOpenDrawer}
                >
                  {
                    open
                      ? <ChevronLeft />
                      : <MenuIcon />
                  }
                </IconButton>
              : <div/>
          }
          <Link
            to={DEFAULT_LOGGED_IN_ROUTE}
          >
            <Typography
              variant='h6'
              noWrap
            >
              HAMMOCK
            </Typography>
          </Link>
        </div>
        <Popper open={openMenu} anchorEl={this.anchorEl} transition disablePortal
          style={{
            zIndex: 10,
            width: '100px',
          }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    <Link onClick={handleClose} to='/settings'><MenuItem>Settings</MenuItem></Link>
                    <Link onClick={handleCloseLogout} to='/logout'><MenuItem>Logout</MenuItem></Link>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <div>
          {
            isLoggedIn
              ? <div
                  className='top-bar-action-wrapper'
                >
                  <Notifications />
                  <div className='top-bar-user-menu'
                    ref={(node) => {
                      this.anchorEl = node;
                    }}
                    aria-owns={open ? 'menu-list-grow' : undefined}
                    aria-haspopup='true'
                    onClick={handleToggle}
                  >
                    <Avatar className='header-avatar'>{getInitials(user.name)}</Avatar>
                    <Typography
                    >
                      {user.name}
                    </Typography>
                    <ArrowDropDown />
                  </div>
                </div>
              : <div>
                  <Link
                    to='/login'
                  >
                    <Button>
                      Login
                    </Button>
                  </Link>
                  <Link
                    to='/sign-up'
                  >
                    <Button>
                      Sign Up
                    </Button>
                  </Link>
                </div>
          }
        </div>
      </Toolbar>
    </AppBar>
    <SideDrawer />
  </div>
  );
};

const mapStateToProps = ({ session, drawer }) => ({
  isLoggedIn: session.isLoggedIn,
  user: session.user,
  open: drawer.open,
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    setDrawerOpen,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
