import { shallow } from 'enzyme';
import * as React from 'react';
import Campaigns from './Campaigns';

describe(`<Campaigns />`, () => {
  it(`should mount`, () => {
    const wrapper = shallow(
        <Campaigns />,
    );

    expect(wrapper).toBeDefined();
  });
});
