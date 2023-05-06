

import { atom, atomFamily, SetterOrUpdater } from 'recoil';

export const loginFlag = atom({
    key : 'loginFlag',
    default : true,
});

export const createChatRoomFlag = atom({
    key : 'createChatRoomFlag',
    default : true,
});

export const welcomeFlag = atom({
    key : 'welcomeFlag',
    default : false,
});

export const dynamicBtnClass = atomFamily<boolean, string>({
    key: 'dynamicBtnClass',
    default: true,
  });

export const sideBarBtnList = atom<SetterOrUpdater<boolean>[]>({
    key : 'sideBarBtnList',
    default : [],
});