import * as React from 'react';
import { shallow } from 'enzyme';
import Section from './Section';

describe(`<Section />`, () => {
    it(`should mount`, () => {
        const wrapper = shallow(
            <Section />,
        );

        expect(wrapper).toBeDefined();
    });
});
