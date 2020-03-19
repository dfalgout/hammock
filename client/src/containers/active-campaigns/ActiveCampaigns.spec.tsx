import { shallow } from 'enzyme';
import * as React from 'react';
import ActiveCampaigns from './ActiveCampaigns';

describe(`<ActiveCampaigns />`, () => {
  it(`should mount`, () => {
    const wrapper = shallow(
      <ActiveCampaigns />,
    );

    expect(wrapper).toBeDefined();
  });
});
