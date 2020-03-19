import * as React from 'react';
import './SectionRow.scss';

interface ISectionRowProps {
  spaceBetween?: boolean;
  children?: any;
}

const SectionRow = (props: ISectionRowProps) => {
  const { children, spaceBetween } = props;

  return (
    <div
      className='form-row'
      style={{
        justifyContent: spaceBetween ? 'space-between' : 'inherit',
        margin: spaceBetween ? 'inherit' : '24px 0',
      }}
    >
      {children}
    </div>
  );
};

export default SectionRow;
