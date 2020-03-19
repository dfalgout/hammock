import * as React from 'react';
import { shallow } from 'enzyme';
import StandardSelectInput from './StandardSelectInput';

const mockProps = {
  name: 'test',
  label: 'test label',
  options: [{}],
};

describe(`<StandardSelectInput />`, () => {
  it(`should mount`, () => {
      const wrapper = shallow(
        <StandardSelectInput { ...mockProps } />,
      );

      expect(wrapper).toBeDefined();
  });
});
