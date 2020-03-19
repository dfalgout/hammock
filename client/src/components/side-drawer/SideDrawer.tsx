import * as React from 'react';
import { Drawer, List, ListItem, ListItemText,
  ListItemIcon, Divider } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import Dashboard from '@material-ui/icons/Dashboard';
import Star from '@material-ui/icons/Star';
import BarChart from '@material-ui/icons/BarChart';
import './SideDrawer.scss';
import { connect } from 'react-redux';

interface ISideDrawer {
  readonly open: boolean;
}

const SideDrawer = (props: ISideDrawer) => {
  return (
    <Drawer
      open={props.open}
      variant='persistent'
      classes={{
        paper: 'side-drawer',
      }}
    >
      <List>
        <NavLink
          to='/profile'
        >
          <ListItem button>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText>
              Profile
            </ListItemText>
          </ListItem>
        </NavLink>
        <Divider />
        <NavLink
          to='/campaigns'
        >
          <ListItem button>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText>
              Campaigns
            </ListItemText>
          </ListItem>
        </NavLink>
        <Divider />
        <NavLink
          to='/active-campaigns'
        >
          <ListItem button>
            <ListItemIcon>
              <Star />
            </ListItemIcon>
            <ListItemText>
              Active Campaigns
            </ListItemText>
          </ListItem>
        </NavLink>
        <Divider />
        <NavLink
          to='/analytics'
        >
          <ListItem button>
            <ListItemIcon>
              <BarChart />
            </ListItemIcon>
            <ListItemText>
              Analytics
            </ListItemText>
          </ListItem>
        </NavLink>
        <Divider />
      </List>
    </Drawer>
  );
};

const mapStateToProps = ({ drawer }: any) => {
  return {
    open: drawer.open,
  };
};

export default connect(
  mapStateToProps,
)(SideDrawer);
