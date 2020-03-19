import * as React from 'react';
import { Typography } from '@material-ui/core';
import './ActiveCampaigns.scss';

const ActiveCampaigns = () => {
  return (
    <div
      className='active-campaigns-wrapper'
    >
      <Typography
        variant='h2'
        component='h2'
        color='primary'
        className='active-campaigns-title'
      >
        ACTIVE CAMPAIGNS
      </Typography>
    </div>
  );
};

export default ActiveCampaigns;
