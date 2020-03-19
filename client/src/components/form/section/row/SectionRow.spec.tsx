import * as React from 'react';
import { shallow } from 'enzyme';
import SectionRow from './SectionRow';

describe(`<SectionRow />`, () => {
    it(`should mount`, () => {
        const wrapper = shallow(
            <SectionRow />,
        );

        expect(wrapper).toBeDefined();
    });
});
