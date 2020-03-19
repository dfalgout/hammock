import { shallow } from 'enzyme';
import * as React from 'react';
import Routes from './Routes';

describe(`<Routes />`, () => {
    it(`should mount`, () => {
        const wrapper = shallow(
            <Routes />,
        );

        expect(wrapper).toBeDefined();
    });
});
