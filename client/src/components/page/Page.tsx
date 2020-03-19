import * as React from 'react';
import { Typography } from '@material-ui/core';
import './Page.scss';

interface IPageProps {
  title: string;
  children?: any;
}

const Page = (props: IPageProps) => {
  const { title, children } = props;

  return (
    <div className='page-wrapper'>
      <Typography
        variant='h2'
        component='h2'
        color='primary'
        className='page-title'
      >
        {title}
      </Typography>
      <div className='page-content'>
        {children}
      </div>
    </div>
  );
};

export default Page;
