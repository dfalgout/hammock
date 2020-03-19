import * as React from 'react';
import { Route, RouteProps, Redirect } from 'react-router';
import { connect, ConnectedComponentClass } from 'react-redux';
import { DEFAULT_LOGGED_IN_ROUTE } from '../../constants/Defaults';

interface IPublicRouteProps {
  routeComponent: React.FunctionComponent | React.ComponentClass | ConnectedComponentClass<any, any>;
  readonly isLoggedIn: boolean;
}

const PublicRoute = (route: IPublicRouteProps & RouteProps) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(route.isLoggedIn);

  React.useEffect(() => {
    setIsLoggedIn(route.isLoggedIn);
  }, [route.isLoggedIn]);

  return (
    <Route
      {...route}
      render={(props: any) => {
        return !isLoggedIn
          ? <route.routeComponent {...props} />
          : <Redirect
              to={{
                pathname: DEFAULT_LOGGED_IN_ROUTE,
              }}
            />;
      }}
    />)
  ;
};

const mapStateToProps = ({ session }: any) => {
  return {
    isLoggedIn: session.isLoggedIn,
  };
};

export default connect(
  mapStateToProps,
)(PublicRoute);
