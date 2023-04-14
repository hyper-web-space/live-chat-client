

import { atom } from 'recoil';

export const loginFlag = atom({
    key : 'loginFlag',
    default : true,
});

export const welcomeFlag = atom({
    key : 'welcomeFlag',
    default : false,
});