import { store } from 'components/redux/store/mainstore';
import {
    switchAuthState,
    changeUser
} from 'components/redux/actions/authAction'

export default function login(body, notifWrap) { // body is FormData
    let auth = function (loginJSON) {
        let token = loginJSON.token;
        switch (loginJSON['login_status']) {
            case 1:
                notificate('Успешная авторизация!', notifWrap, 'success');
                if ( body.get('isRemember') === 'on' ) {
                    localStorage.setItem('auth_token', token);
                    localStorage.setItem('user', JSON.stringify(loginJSON.user));
                }
                store.dispatch(switchAuthState(true));
                store.dispatch(changeUser(loginJSON.user));
                break;
            case 2:
                notificate('Неверный пароль', notifWrap, 'error');
                break;
            case 3:
                notificate('Пользователь заблокирован', notifWrap, 'error');
                break;
            case 4:
                notificate('Такой пользователь не существует!', notifWrap, 'warn');
                break;
            default:
                notificate('Неизвестная ошибка!', notifWrap, 'error');
        }
    };

    return fetch('http://127.0.0.1:8000/user/login/', {
        method: 'POST',
        body: body
    })
        .then(response => response.json())
        .then(json => auth(json))
        .catch(() => notificate('Ошибка сервера при авторизации', notifWrap, 'error'));
}