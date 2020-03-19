import {
  Button,
  Typography,
  TextField,
} from '@material-ui/core';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import LoginCredentials from '../../models/LoginCredentials';
import { bindActionCreators, compose, AnyAction } from 'redux';
import { logUserIn } from '../../redux/actions/session';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { RouterProps, Redirect } from 'react-router';
import './Login.scss';
import { DEFAULT_LOGGED_IN_ROUTE } from '../../constants/Defaults';

interface ILoginProps {
  logUserIn: typeof logUserIn;
  isLoggedIn: boolean;
}

const Login = (props: ILoginProps & RouterProps) => {
  const userCredentials = new LoginCredentials();

  const onSubmit = async (credentials: LoginCredentials) => {
    props.logUserIn(credentials);
    props.history.push(DEFAULT_LOGGED_IN_ROUTE);
  };

  const required = (value: any): any => (
    value ? undefined : 'Required'
  );

  const renderForm = () => (
    <div
      className='login-wrapper'
    >
      <Typography
        variant='h2'
        component='h2'
        color='primary'
        className='login-title'
      >
        LOGIN
      </Typography>
      <Form
        onSubmit={onSubmit}
        initialValues={userCredentials}
        render={({ handleSubmit, pristine, invalid, submitting }) => (
          <form
            className='login-form'
            onSubmit={handleSubmit}
          >
            <Field
              name='email'
              validate={required}
              render={({ input }) => (
                <TextField
                  {...input}
                  required
                  label='Email'
                  margin='dense'
                  variant='outlined'
                />
              )}
            />
            <Field
              name='password'
              validate={required}
              render={({ input }) => (
                <TextField
                  {...input}
                  required
                  type='password'
                  label='Password'
                  margin='dense'
                  variant='outlined'
                />
              )}
            />
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={pristine || invalid || submitting}
            >
              Login
            </Button>
          </form>
        )}
      />
    </div>
  );

  return (
    <div>
      {
        props.isLoggedIn
          ? <Redirect to={DEFAULT_LOGGED_IN_ROUTE} />
          : renderForm()
      }
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoggedIn: state.session.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return bindActionCreators({
    logUserIn,
  }, dispatch);
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Login);
