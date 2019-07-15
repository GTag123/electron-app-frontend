import { store } from 'components/redux/store/mainstore';
import {
    switchAuthState,
    changeUser
} from 'components/redux/actions/authAction';
import { serverUrl, fetchMode } from 'settings';

export default function () {
    let token = window.localStorage.getItem('auth_token'),
        date = +window.localStorage.getItem('auth_date'), // unix ms
        refresh_delay = 15 * 24 * 3600000, // ms
        checkTokenLife = async function () {
            if (Date.now() - date > refresh_delay) {
                try {
                    let response = await fetch(serverUrl + '/user/token-refresh/', {
                        method: 'POST',
                        mode: fetchMode,
                        headers: {
                            'Authorization': 'Bearer ' + token,
                        }
                    });

                    if (response.ok) {
                        let json = await response.json();
                        token = json.token;
                        localStorage.setItem('auth_token', token);
                        localStorage.setItem('auth_date', Date.now().toString());
                    }
                }
                catch (err) {
                    notificate('Ошибка соединения при попытке обновить токен. Ошибка: ' + err, 'error');
                }
            }
        };
    if (token && token.trim()) {
        return fetch(serverUrl + '/user/info/', {
            method: 'POST',
            mode: fetchMode,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({ online: true })
        })
            .then(async response => {
                if (!response.ok) {
                    notificate('Неверный токен, либо он истёк. Пожалуйста, авторизуйтесь!', 'error');
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('auth_date');
                    return;
                }
                try {
                    const json = await response.json();
                    /* TODO FIXME WARN бэк говно! т.к. не даёт никак кодов успеха/ошибки. фиг знает чё там случается
                    крч. в нашём коде 1ккк уязвимостей + могут случаться непонятки между бэком и клентом 
                    проект пошёл в говно(((( */
                    console.log('auth');
                    notificate('Успешная авторизация!', 'success');
                    store.dispatch(changeUser(json));
                    store.dispatch(switchAuthState(true));
                    checkTokenLife();
                }
                catch (e) {
                    return notificate('Ля, какая-то ошибка при парсинге и работе с json. Такого не должно быть(', 'error');
                }
            })
            .catch(() => notificate('Нет соединения с сервером', 'error'));
    }
}