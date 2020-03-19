import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../login/Login';
import PrivateRoute from '../private-route/PrivateRoute';
import NoMatch from '../no-match/NoMatch';
import SignUp from '../creator-sign-up/CreatorSignUp';
import Campaigns from '../../containers/campaigns/Campaigns';
import Logout from '../logout/Logout';
import SignUpFlow from '../../containers/sign-up-flow/SignUpFlow';
import Profile from '../../containers/profile/Profile';
import ActiveCampaigns from '../../containers/active-campaigns/ActiveCampaigns';
import Analytics from '../../containers/analytics/Analytics';
import Settings from '../../containers/settings/Settings';
import PublicRoute from '../public-route/PublicRoute';

const Routes = () => (
  <Switch>
    <PublicRoute path='/sign-up' exact={true} routeComponent={SignUpFlow} />
    <PublicRoute path='/sign-up/:type' exact={true} routeComponent={SignUp} />
    <PublicRoute path='/login' routeComponent={Login} />
    <PrivateRoute path='/logout' routeComponent={Logout} />
    <PrivateRoute path='/settings' routeComponent={Settings} />
    <PrivateRoute path='/profile' routeComponent={Profile} />
    <PrivateRoute path='/campaigns' routeComponent={Campaigns} />
    <PrivateRoute path='/active-campaigns' routeComponent={ActiveCampaigns} />
    <PrivateRoute path='/analytics' routeComponent={Analytics} />
    <Route path='/*' component={NoMatch} />
  </Switch>
);

export default Routes;
