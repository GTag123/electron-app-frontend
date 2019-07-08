import React from 'react';
import { Login } from './login';
import { Reg } from './reg';

export class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNewUser: false
        };
        this.notifsRef = React.createRef();
        this.changeForm = this.changeForm.bind(this);
    }
    changeForm() {
        this.setState((state) => ({
            isNewUser: !state.isNewUser
        }));
    }
    componentDidMount () {
        this.forceUpdate();
    }
    render() {
        return (
            <div className="centered">
                <div className='notifications' ref={this.notifsRef}>
                </div>
                <div className='auth-block'>
                    {this.state.isNewUser ?
                        <Reg changeForm={this.changeForm}
                            notifWrap={this.notifsRef.current} /> :
                        <Login changeForm={this.changeForm}
                            notifWrap={this.notifsRef.current} />}
                </div>
            </div>
        );
    }
}

