/*

 */

import { atom,selector } from 'recoil';

export const LoginFlag = atom({
    key : 'userId',
    default : true,
});

export const userPw = atom({
    key : 'userPw',
    default : "",
});
