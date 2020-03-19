import { shallow } from 'enzyme';
import * as React from 'react';
import { App } from './App';
import UserSession from '../../models/UserSession';

const mockProps = {
    isLoggedIn: false,
    user: new UserSession(),
    drawerOpen: false,
};

describe(`<App />`, () => {
    it(`should mount`, () => {
        const wrapper = shallow(
            <App {...mockProps} />,
        );

        expect(wrapper).toBeDefined();
    });
});
