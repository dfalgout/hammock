import * as React from 'react';
import { shallow } from 'enzyme';
import DebounceValidator from './DebounceValidator';

const mockProps = {
  debounce: 1000,
  validate: jest.fn(),
  component: () => (<div />),
};

describe(`<DebounceValidator />`, () => {
    it(`should mount`, () => {
        const wrapper = shallow(
            <DebounceValidator { ...mockProps } />,
        );

        expect(wrapper).toBeDefined();
    });
});
