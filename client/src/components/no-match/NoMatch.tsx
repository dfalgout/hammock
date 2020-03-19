import * as React from 'react';
import { Redirect } from 'react-router';
import { DEFAULT_LOGGED_IN_ROUTE } from '../../constants/Defaults';

const NoMatch = () => (
  <Redirect
    to={{
      pathname: DEFAULT_LOGGED_IN_ROUTE,
    }}
  />
);

export default NoMatch;
