import React from 'react';
import PropTypes from 'prop-types'

import { Auth } from  'components/jsx/auth.jsx';
import { connect } from 'react-redux';
import {
    setNotifWrap
} from 'components/redux/actions/notificateAction'

class MainView extends React.Component {
    constructor (props) {
        super(props);
        this.notifsRef = React.createRef();
    }
    componentDidMount () {
        this.props.dispatch(setNotifWrap(this.notifsRef.current))
        this.forceUpdate();
    }
    render () {
        console.log(this.props)
        const { loginned, user } = this.props.auth;
        return (
            <div className='view'>
                <div className="notif-wrapper">
                    <div className='notifications' ref={this.notifsRef}></div>
                </div>
                { this.notifsRef.current && // skiping Auth render during first render
                    (loginned && user ?
                        console.log('yeah') :
                        <Auth />
                    )}
            </div>
        );
    }
}

const mapStateToProps = state => ( state )
export default connect(mapStateToProps)(MainView);

MainView.propTypes = {
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};