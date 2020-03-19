import * as React from 'react';
import { shallow } from 'enzyme';
import StandardField from './StandardField';

const mockProps = {
  name: 'test',
  label: 'test label',
  required: true,
};

describe(`<StandardField />`, () => {
  it(`should mount`, () => {
      const wrapper = shallow(
        <StandardField { ...mockProps } />,
      );

      expect(wrapper).toBeDefined();
  });
});
