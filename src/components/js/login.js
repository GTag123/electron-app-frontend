import { store } from 'components/redux/store/mainstore';
import {
    switchAuthState,
    changeUser
} from 'components/redux/actions/authAction';
import { serverUrl, fetchMode } from 'settings';

export default function login(body) { // body is FormData
    let auth = function (loginJSON) {
        let token = loginJSON.token;
        switch (loginJSON['login_status']) {
            case 1: // success auth
                notificate('Успешная авторизация!', 'success');
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_date');
                if ( body.get('isRemember') === 'on' ) {
                    localStorage.setItem('auth_token', token);
                    localStorage.setItem('auth_date', Date.now().toString());
                    // localStorage.setItem('user', JSON.stringify(loginJSON.user));
                }
                store.dispatch(changeUser(loginJSON.user));
                store.dispatch(switchAuthState(true));
                break;
            case 2: // wrong password
                notificate('Неверный пароль', 'error');
                break;
            case 3: // user banned
                notificate('Пользователь заблокирован', 'error');
                break;
            case 4: // user doesn't exists
                notificate('Такой пользователь не существует!', 'warn');
                break;
            default:
                notificate('Неизвестная ошибка!', 'error');
        }
    };

    fetch(serverUrl + '/user/login/', {
        method: 'POST',
        mode: fetchMode,
        body: body
    })
        .then(response => response.json())
        .then(json => auth(json))
        .catch(() => notificate('Ошибка сервера при авторизации', 'error'));
}