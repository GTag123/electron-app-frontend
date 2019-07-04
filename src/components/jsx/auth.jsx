import React from 'react';
import Login from './login';
import Reg from './reg';

export default class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNewUser: false
        };
        this.notifsRef = React.createRef();
        this.changeForm = this.changeForm.bind(this);
        this.login = this.login.bind(this);
    }
    changeForm() {
        this.setState((state) => ({
            isNewUser: !state.isNewUser
        }));
    }
    login(body) {
        let auth = (function (loginJSON) {
            let token = loginJSON.token;
            switch (loginJSON['login_status']) {
                case 1:
                    notificate('Успешная авторизация!', this.notifsRef.current, 'success');
                    console.log(token);
                    break;
                case 2:
                    notificate('Неверный пароль', this.notifsRef.current, 'error');
                    break;
                case 3:
                    notificate('Пользователь заблокирован', this.notifsRef.current, 'error');
                    break;
                case 4:
                    notificate('Такой пользователь не существует!', this.notifsRef.current, 'warn');
                    break;
                default:
                    notificate('Неизвестная ошибка!', this.notifsRef.current, 'error');
            }
        }).bind(this);

        fetch('http://127.0.0.1:8000/user/login/', {
            method: 'POST',
            body: body
        })
            .then(response => response.json())
            .then(json => auth(json))
            .catch(() => notificate('Ошибка сервера при авторизации', this.notifsRef.current, 'error'));
    }

    render() {
        return (
            <div className="centered">
                <div className='notifications' ref={this.notifsRef}>
                </div>
                <div className='auth-block'>
                    {this.state.isNewUser ?
                        <Reg changeForm={this.changeForm} login={this.login} notifWrap={this.notifsRef.current}/> :
                        <Login changeForm={this.changeForm} login={this.login} />}
                </div>
            </div>
        );
    }
}
//