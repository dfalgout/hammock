import * as React from 'react';
import { shallow } from 'enzyme';
import PrivateRoute from './PrivateRoute';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(jest.fn());

describe(`<PrivateRoute />`, () => {
  it(`should mount`, () => {
      const wrapper = shallow(
        <Provider store={store}>
          <PrivateRoute routeComponent={jest.fn()}/>
        </Provider>,
      );

      expect(wrapper).toBeDefined();
  });
});
