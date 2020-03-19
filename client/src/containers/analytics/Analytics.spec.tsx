import { shallow } from 'enzyme';
import * as React from 'react';
import Analytics from './Analytics';

describe(`<Analytics />`, () => {
  it(`should mount`, () => {
    const wrapper = shallow(
        <Analytics />,
    );

    expect(wrapper).toBeDefined();
  });
});
