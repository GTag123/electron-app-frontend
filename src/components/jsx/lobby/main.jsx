import React from 'react';
import { store } from 'components/redux/store/mainstore';

export class LobbyView extends React.Component {
    render () {
        let user = store.getState().auth.user;
        return (
            <div>
                <ol>
                    <li>Id: {user.id}</li>
                    <li>Username: {user.username}</li>
                    <li>Email: {user.email}</li>
                    <li>Date joined: {user.date_joined}</li>
                </ol>
            </div>
        );
    }
}