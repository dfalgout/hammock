import { shallow } from 'enzyme';
import * as React from 'react';
import SignUpFlow from './SignUpFlow';

describe(`<SignUpFlow />`, () => {
  it(`should mount`, () => {
    const wrapper = shallow(
      <SignUpFlow />,
    );

    expect(wrapper).toBeDefined();
  });
});
