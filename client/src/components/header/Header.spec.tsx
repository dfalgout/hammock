import * as React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(jest.fn());

describe(`<Header />`, () => {
  it(`should mount`, () => {
      const wrapper = shallow(
        <Provider store={store}>
          <Header />
        </Provider>,
      );

      expect(wrapper).toBeDefined();
  });
});
