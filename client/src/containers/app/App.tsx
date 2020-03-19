import * as React from 'react';
import './App.scss';
import { connect } from 'react-redux';
import Header from '../../components/header/Header';
import Routes from '../../components/routes/Routes';

interface IAppProps {
    readonly drawerOpen: boolean;
}

export const App = (props: IAppProps) => {
    const { drawerOpen } = props;

    return (
        <div>
            <Header />
            <div className={drawerOpen ? 'main-content-shifted' : 'main-content'}>
                <Routes />
            </div>
        </div>
    );
};

const mapStateToProps = ({ drawer }: any) => {
    return {
        drawerOpen: drawer.open,
    };
};

export default connect(
    mapStateToProps,
)(App);
