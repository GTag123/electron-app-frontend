import React from 'react';
import { Login } from './login';
import { Reg } from './reg';

export class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNewUser: false
        };
        this.changeForm = this.changeForm.bind(this);
    }
    changeForm() {
        this.setState((state) => ({
            isNewUser: !state.isNewUser
        }));
    }
    render() {
        return (
            <div className="centered-auth">
                <div className='auth-block'>
                    {this.state.isNewUser ?
                        <Reg changeForm={this.changeForm} /> :
                        <Login changeForm={this.changeForm} />}
                </div>
            </div>
        );
    }
}
