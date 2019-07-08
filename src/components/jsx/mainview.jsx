import React from 'react';
import PropTypes from 'prop-types'

import { Auth } from  'components/jsx/auth.jsx';
import { connect } from 'react-redux';

class MainView extends React.Component {
    render () {
        const { loginned, user } = this.props.auth;
        console.log(this.props);
        return (
            <div>{ loginned && user ? console.log('yeah') : <Auth /> }</div>
        );
    }
}

const mapStateToProps = state => ( state )
export default connect(mapStateToProps)(MainView);

MainView.propTypes = {
    auth: PropTypes.object.isRequired,
};