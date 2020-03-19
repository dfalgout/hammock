import * as React from 'react';
import { shallow } from 'enzyme';
import PublicRoute from './PublicRoute';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(jest.fn());

describe(`<PublicRoute />`, () => {
  it(`should mount`, () => {
      const wrapper = shallow(
        <Provider store={store}>
          <PublicRoute routeComponent={jest.fn()}/>
        </Provider>,
      );

      expect(wrapper).toBeDefined();
  });
});
