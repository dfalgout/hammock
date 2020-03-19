import * as React from 'react';
import { shallow } from 'enzyme';
import CreatorSignUp from './CreatorSignUp';

describe(`<CreatorSignUp />`, () => {
  it(`should mount`, () => {
    const wrapper = shallow(
        <CreatorSignUp />,
    );

    expect(wrapper).toBeDefined();
  });
});
