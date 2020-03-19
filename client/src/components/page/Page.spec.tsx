import * as React from 'react';
import { shallow } from 'enzyme';
import Page from './Page';

const mockProps = {
  title: 'test',
};

describe(`<Page />`, () => {
    it(`should mount`, () => {
        const wrapper = shallow(
            <Page { ...mockProps } />,
        );

        expect(wrapper).toBeDefined();
    });
});
