import * as React from 'react';
import { shallow } from 'enzyme';
import Logout from './Logout';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(jest.fn());

describe(`<Logout />`, () => {
  it(`should mount`, () => {
      const wrapper = shallow(
        <Provider store={store}>
          <Logout />
        </Provider>,
      );

      expect(wrapper).toBeDefined();
  });
});
