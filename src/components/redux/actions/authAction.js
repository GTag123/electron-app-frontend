export const USER_LOGINNING = 'USER_LOGINNING';
export const USER_INFO_CHANGE = 'USER_INFO_CHANGE';

export function switchAuthState (authStatus) {
    return {
        type: USER_LOGINNING,
        payload: authStatus
    }
}

export function changeUser (user) {
    return {
        type: USER_INFO_CHANGE,
        payload: user
    }
}
