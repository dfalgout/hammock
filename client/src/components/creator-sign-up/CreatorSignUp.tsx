import * as React from 'react';
import { Form } from 'react-final-form';
import { Typography, Button } from '@material-ui/core';
import CreateUser from '../../models/CreateUser';
import './CreatorSignUp.scss';
import { RoleType } from '../../models/RoleType';
import UserService from '../../services/users/UserService';
import { withRouter, RouterProps, Redirect } from 'react-router';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { UserType } from '../../models/UserType';
import { logUserIn } from '../../redux/actions/session';
import LoginCredentials from '../../models/LoginCredentials';
import CreateUserForm from '../../models/CreateUserForm';
import { DEFAULT_LOGGED_IN_ROUTE } from '../../constants/Defaults';
import DebounceValidator from '../form/debounce-validator/DebounceValidator';
import StandardField from '../form/standard-field/StandardField';

interface ICreatorSignUpProps {
  isLoggedIn: boolean;
  logUserIn: typeof logUserIn;
}

const CreatorSignUp = (props: ICreatorSignUpProps & RouterProps) => {
  const initialCreateUser = new CreateUserForm();
  const [initialValues] = React.useState({
    ...initialCreateUser,
    confirmPassword: null,
  });

  const onSubmit = async (values) => {
    const createUser = new CreateUser(values, UserType.CREATOR, RoleType.STANDARD);

    await UserService.create(createUser);
    const credentials = new LoginCredentials();
    credentials.email = createUser.email;
    credentials.password = createUser.password;

    await props.logUserIn(credentials);
    props.history.push(DEFAULT_LOGGED_IN_ROUTE);
  };

  const required = (value: any): any => {
    return value ? undefined : 'Required';
  };

  const verifyEmail = async (email: string) => {
    if (email) {
      const result = await UserService.emailExists(email);
      return result.data ? 'That email already exists' : undefined;
    } else {
      return 'Required';
    }
  };

  const formValidator = (values: any) => {
    const errors = {} as any;
    if (values.password &&
      values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Must match password';
    }
    return errors;
  };

  const renderForm = () => (
    <div
      className='sign-up-wrapper'
    >
      <Typography
        variant='h2'
        component='h2'
        color='primary'
        className='user-type-header'
      >
        {UserType.CREATOR}
      </Typography>
      <Typography
        variant='h5'
        component='h3'
      >
        Sign up
      </Typography>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={formValidator}
        render={({ handleSubmit, pristine, invalid, submitting }) => (
          <form
            className='sign-up-form'
            onSubmit={handleSubmit}
          >
            <DebounceValidator
              name='email'
              label='Email'
              required={true}
              debounce={1000}
              validate={verifyEmail}
              component={StandardField}
            />
            <StandardField
              name='firstName'
              label='First Name'
              required={true}
              validate={required}
            />
            <StandardField
              name='lastName'
              label='Last Name'
              required={true}
              validate={required}
            />
            <StandardField
              name='password'
              label='Password'
              required={true}
              validate={required}
              type='password'
            />
            <StandardField
              name='confirmPassword'
              label='Confirm Password'
              required={true}
              validate={required}
              type='password'
            />
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={pristine || invalid || submitting}
            >
              Sign up!
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

const mapStateToProps = ({ session }) => ({
  isLoggedIn: session.isLoggedIn,
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    logUserIn,
  }, dispatch);
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(CreatorSignUp);
