import * as React from 'react';
import { Typography } from '@material-ui/core';
import './Section.scss';

interface ISectionProps {
  title?: string;
  children?: any;
}

const Section = (props: ISectionProps) => {
  const { title, children } = props;

  return (
    <div className='section-content'>
      {
        title
          ? <Typography>
              {title}
            </Typography>
          : null
      }
      {children}
    </div>
  );
};

export default Section;
