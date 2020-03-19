import * as React from 'react';
import { shallow } from 'enzyme';
import NoMatch from './NoMatch';

describe(`<NoMatch />`, () => {
  it(`should mount`, () => {
      const wrapper = shallow(
          <NoMatch />,
      );

      expect(wrapper).toBeDefined();
  });
});
