
import { atom } from 'recoil';

import { ChatRoom } from '../components/pages/MainPage/MainPage';

export const chatRoomList = atom<ChatRoom[]>({
    key : 'chatRoomList',
    default : [],
});
