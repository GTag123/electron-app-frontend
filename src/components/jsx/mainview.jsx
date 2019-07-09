import React from 'react';
import PropTypes from 'prop-types';

import tokenCheck from 'components/js/token-auth';
import { Auth } from  'components/jsx/auth/auth.jsx';
import { LobbyView } from  'components/jsx/lobby/main.jsx';

import { connect } from 'react-redux';
import {
    setNotifWrap
} from 'components/redux/actions/notificateAction';

class MainView extends React.Component {
    constructor (props) {
        super(props);
        this.notifsRef = React.createRef();
    }
    async componentDidMount () {
        this.props.dispatch(setNotifWrap(this.notifsRef.current)); // setting notify.js wrapper
        await tokenCheck();
        if (!this.props.loginned) this.forceUpdate(); // сойдёт
    }
    render () {
        console.log(this.props);
        const loginned  = this.props.loginned;
        return (
            <div className='view'>
                <div className="notif-wrapper">
                    <div className='notifications' ref={this.notifsRef}></div>
                </div>
                { this.notifsRef.current && // skiping Auth render during first render
                    (loginned ?
                        <LobbyView /> :
                        <Auth />
                    )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loginned: state.auth.loginned
    };
};
export default connect(mapStateToProps)(MainView);

MainView.propTypes = {
    loginned: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
};