import { LOGIN, LOGOUT } from './type';

export const login = (user) => ({
    type: LOGIN,
    data: user
});

export const logout = () => ({
    type: LOGOUT,

});

