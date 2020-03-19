import * as React from 'react';
import { Typography } from '@material-ui/core';
import './SignUpFlow.scss';
import { withRouter } from 'react-router-dom';
import { RouterProps } from 'react-router';

export const SignUpFlow = (props: RouterProps) => {
  return (
    <div
      className='sign-up-flow-container'
    >
      <div
        className='choose-box light'
        onClick={() => props.history.push('/sign-up/creator')}
      >
        <Typography
          component='h1'
          variant='h1'
        >
          CREATOR
        </Typography>
      </div>
      <div
        className='choose-box dark'
        onClick={() => props.history.push('/sign-up/brand')}
      >
        <Typography
          component='h1'
          variant='h1'
        >
          BRAND
        </Typography>
      </div>
    </div>
  );
};

export default withRouter(SignUpFlow);
