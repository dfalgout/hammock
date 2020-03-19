import { shallow } from 'enzyme';
import * as React from 'react';
import { Profile } from './Profile';

describe(`<Profile />`, () => {
  it(`should mount`, () => {
    const wrapper = shallow(
      <Profile />,
    );

    expect(wrapper).toBeDefined();
  });
});
