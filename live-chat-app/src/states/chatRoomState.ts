
import { atom } from 'recoil';

import { ChatRoom } from '../components/pages/MainPage/MainPage';

export const chatRoomList = atom<ChatRoom[]>({
    key : 'chatRoomList',
    default : [],
});

export const createChatRoomName = atom<string>({
    key : 'createChatRoomName',
    default : '',
});

export const createChatRoomPassWord = atom<string>({
    key : 'createChatRoomPassWord',
    default : '',
});

export const createChatRoomPrivateYn = atom<boolean>({
    key : 'createChatRoomPrivateYn',
    default : false,
});

