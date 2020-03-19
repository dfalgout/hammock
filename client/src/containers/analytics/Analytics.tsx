import * as React from 'react';
import './Analytics.scss';
import { Typography } from '@material-ui/core';

const Analytics = () => {
  return (
    <div
      className='analytics-wrapper'
    >
      <Typography
        variant='h2'
        component='h2'
        color='primary'
        className='analytics-title'
      >
        ANALYTICS
      </Typography>
    </div>
  );
};

export default Analytics;
