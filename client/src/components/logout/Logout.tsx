import * as React from 'react';
import { Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import { logUserOut } from '../../redux/actions/session';
import { connect } from 'react-redux';
import { DEFAULT_LOGGED_OUT_ROUTE } from '../../constants/Defaults';

interface ILogout {
  logUserOut: typeof logUserOut;
}

const Logout = (props: ILogout) => {
  props.logUserOut();

  return (
    <Redirect
      to={DEFAULT_LOGGED_OUT_ROUTE}
    />
  );
};

const mapDispatchToProps = (dispatch: any) => (
  bindActionCreators({
    logUserOut,
  }, dispatch)
);

export default connect(
  null,
  mapDispatchToProps,
)(Logout);
