import { shallow } from 'enzyme';
import * as React from 'react';
import { Settings } from './Settings';
import UserSession from '../../models/UserSession';

const mockProps = {
  user: new UserSession(),
  refreshToken: jest.fn(),
};

describe(`<Settings />`, () => {
  it(`should mount`, () => {
    const wrapper = shallow(
      <Settings { ...mockProps } />,
    );

    expect(wrapper).toBeDefined();
  });
});
