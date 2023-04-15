

import { atom, atomFamily } from 'recoil';

export const loginFlag = atom({
    key : 'loginFlag',
    default : true,
});

export const welcomeFlag = atom({
    key : 'welcomeFlag',
    default : false,
});


export const dynamicBtnClass = atomFamily({
    key: 'dynamicBtnClass',
    default: true,
  });