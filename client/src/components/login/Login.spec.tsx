import * as React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe(`<Login />`, () => {
    it(`should mount`, () => {
        const wrapper = shallow(
            <Login />,
        );

        expect(wrapper).toBeDefined();
    });
});
