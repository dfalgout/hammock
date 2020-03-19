import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { login, logUserOut } from '../../redux/actions/session';
import Cookies from 'universal-cookie';
import { withRouter, RouterProps } from 'react-router';

interface ISessionProps {
  login: typeof login;
  logUserOut: typeof logUserOut;
  children?: React.ReactNode;
}

const Session = (props: ISessionProps & RouterProps) => {
  const cookies = new Cookies();
  const token = cookies.get('access_token');
  const [hasToken, setHasToken] = React.useState(!!token);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const login = (token: string) => {
    props.login(token);
    setLoggedIn(true);
  };

  const logout = () => {
    props.logUserOut();
    setHasToken(false);
    setLoggedIn(false);
  };

  React.useEffect(() => {
    if (hasToken) {
      if (!loggedIn) { login(token); }
    } else {
      logout();
    }
  }, [hasToken]);

  return (
    <div>
      {props.children}
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    login,
    logUserOut,
  }, dispatch);
};

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(Session);
