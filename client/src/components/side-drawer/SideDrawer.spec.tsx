import { shallow } from 'enzyme';
import * as React from 'react';
import SideDrawer from './SideDrawer';
import UserSession from '../../models/UserSession';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../redux/reducers';

const mockProps = {
  open: true,
  user: new UserSession(),
};

const mockStore = createStore(rootReducer);

describe(`<SideDrawer />`, () => {
  it(`should mount`, () => {
    const wrapper = shallow(
      <Provider store={mockStore}>
        <SideDrawer { ...mockProps } />
      </Provider>,
    );

    expect(wrapper).toBeDefined();
  });
});
