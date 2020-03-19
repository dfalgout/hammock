import * as React from 'react';
import { shallow } from 'enzyme';
import DatePicker from './DatePicker';

const mockProps = {
  name: 'test',
  label: 'test label',
};

describe(`<DatePicker />`, () => {
  it(`should mount`, () => {
      const wrapper = shallow(
        <DatePicker { ...mockProps } />,
      );

      expect(wrapper).toBeDefined();
  });
});
