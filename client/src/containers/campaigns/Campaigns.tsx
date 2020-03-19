import * as React from 'react';
import './Campaigns.scss';
import { Typography } from '@material-ui/core';

const Campaigns = () => {
  return (
    <div
      className='campaigns-wrapper'
    >
      <Typography
        variant='h2'
        component='h2'
        color='primary'
        className='campaigns-title'
      >
        CAMPAIGNS
      </Typography>
    </div>
  );
};

export default Campaigns;
