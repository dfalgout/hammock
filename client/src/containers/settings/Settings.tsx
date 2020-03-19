import * as React from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import UserSession from '../../models/UserSession';
import UserService from '../../services/users/UserService';
import User from '../../models/User';
import { Form } from 'react-final-form';
import { bindActionCreators } from 'redux';
import { refreshToken } from '../../redux/actions/session';
import { GenderType } from '../../models/GenderType';
import StandardField from '../../components/form/standard-field/StandardField';
import DatePicker from '../../components/form/date-picker/DatePicker';
import StandardSelectInput from '../../components/form/select-input/StandardSelectInput';
import DebounceValidator from '../../components/form/debounce-validator/DebounceValidator';
import Page from '../../components/page/Page';
import Section from '../../components/form/section/Section';
import SectionRow from '../../components/form/section/row/SectionRow';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import LinkSocialMediaService from '../../services/link-social-media/LinkSocialMediaService';
import LoginService from '../../services/login/LoginService';

interface ISettingsProps {
  readonly user: UserSession;
  readonly refreshToken: typeof refreshToken;
}

export const Settings = (props: ISettingsProps) => {
  const { user, refreshToken } = props;
  const [initialValues, setInitialValues] = React.useState(new User());
  const [instagramLinked, setInstagramLinked] = React.useState(false);

  React.useEffect(() => {
    UserService.getOne(user.id).then((res) => {
      setInitialValues(res.data);
      setInstagramLinked(res.data.instagramLinked);
    });
  }, [user]);

  const onSubmit = (user: User) => {
    UserService.update(user)
    .then((res) => {
      if (res.status === 200) {
        refreshToken();
      } else {
        console.log('Update UnSuccessful'); // tslint:disable-line:no-console
      }
    });
  };

  const required = (value: any) => {
    return value ? undefined : 'Required';
  };

  const verifyEmail = async (email: string) => {
    if (email) {
      if (initialValues.email !== email) {
        const result = await UserService.emailExists(email);
        return result.data ? 'That email already exists' : undefined;
      }
    } else {
      return 'Required';
    }
  };

  return (
    <Page
      title='SETTINGS'
    >
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        subscription={{ pristine: true, submitting: true }}
        render={({ handleSubmit, pristine, invalid, submitting, form }) => (
          <form
            className='sign-up-form'
            onSubmit={handleSubmit}
          >
            <Section
              title='Personal Information'
            >
              <SectionRow>
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
              </SectionRow>
              <SectionRow>
                <DebounceValidator
                  name='email'
                  label='Email'
                  required={true}
                  debounce={1000}
                  validate={verifyEmail}
                  component={StandardField}
                />
                <DatePicker
                  name='birthDate'
                  label='Birthdate'
                />
                <StandardSelectInput
                  name='gender'
                  label='Gender'
                  fullWidth={true}
                  options={[...Object.keys(GenderType).map((gender) => ({ key: gender, value: gender }))]}
                  className='gender-select-input'
                />
              </SectionRow>
            </Section>
            <Section
              title='Shipping Address'
            >
              <SectionRow>
                <StandardField
                  name='shippingAddress.street1'
                  label='Street'
                  required={false}
                />
                <StandardField
                  name='shippingAddress.street2'
                  label='Street 2'
                  required={false}
                />
              </SectionRow>
              <SectionRow>
                <StandardField
                  name='shippingAddress.city'
                  label='City'
                  required={false}
                />
                <StandardField
                  name='shippingAddress.state'
                  label='State'
                  required={false}
                />
                <StandardField
                  name='shippingAddress.zipCode'
                  label='Zipcode'
                  required={false}
                />
              </SectionRow>
            </Section>
            <Section
              title='Social Media'
            >
              {
                !instagramLinked
                  ? <FacebookLogin
                      appId='446815719415147'
                      autoLoad={false}
                      scope='instagram_basic,pages_show_list,instagram_manage_insights'
                      fields='name,email,picture'
                      callback={async (res: any) => {
                        const result = await LinkSocialMediaService
                          .linkInstagram(user.id, res.accessToken, res.data_access_expiration_time);
                        if (result.status === 200) {
                          setInstagramLinked(result.data.instagramLinked);
                        }
                      }}
                      render={(renderProps: any) => (
                        <Button onClick={renderProps.onClick}>Link Your Instagram</Button>
                      )}
                    />
                  : <Button disabled={true}>Instagram Linked</Button>
              }
            </Section>
            <Section>
              <SectionRow
                spaceBetween={true}
              >
                <Button
                  variant='text'
                  color='primary'
                  onClick={() => form.reset()}
                  disabled={pristine || submitting}
                >
                  Reset
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  disabled={pristine || invalid || submitting}
                >
                  Submit
                </Button>
              </SectionRow>
            </Section>
          </form>
        )}
      />
    </Page>
  );
};

const mapStateToProps = ({ session }: any) => {
  return {
    user: session.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    refreshToken,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
