import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router';
import { connect, ConnectedComponentClass } from 'react-redux';
import { DEFAULT_LOGGED_OUT_ROUTE } from '../../constants/Defaults';

interface IPrivateRouteProps {
  routeComponent: React.FunctionComponent | ConnectedComponentClass<any, any>;
  readonly isLoggedIn: boolean;
}

const PrivateRoute = (route: IPrivateRouteProps & RouteProps) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(route.isLoggedIn);

  React.useEffect(() => {
    setIsLoggedIn(route.isLoggedIn);
  }, [route.isLoggedIn]);

  return (
    <Route
      {...route}
      render={(props: any) => {
        return isLoggedIn
          ? <route.routeComponent {...props} />
          : <Redirect
              to={{
                pathname: DEFAULT_LOGGED_OUT_ROUTE,
                state: { from: props.location },
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
)(PrivateRoute);
