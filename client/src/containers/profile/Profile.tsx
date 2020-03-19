import * as React from 'react';
import { Typography } from '@material-ui/core';
import './Profile.scss';

export const Profile = () => {
  return (
    <div
      className='profile-wrapper'
    >
      <Typography
        variant='h2'
        component='h2'
        color='primary'
        className='profile-title'
      >
        PROFILE
      </Typography>
    </div>
  );
};

export default Profile;
