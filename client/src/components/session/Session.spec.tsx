import * as React from 'react';
import { shallow } from 'enzyme';
import Session from './Session';

describe(`<Session />`, () => {
  it(`should mount`, () => {
    const wrapper = shallow(
        <Session />,
    );

    expect(wrapper).toBeDefined();
  });
});
