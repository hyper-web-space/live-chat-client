
import { atom,SetterOrUpdater } from 'recoil';

export interface ChatRooms {
    chatRooms: ChatRoom[];
  }
  
  export interface ChatRoom {
    chatRoomId: string;
    name: string;
    creator: string;
    numberOfUser: number;
    privateRoom: boolean;
    createdAt: string;
    creatRoomId: string;
  }


export const chatRoomCount = atom<number>({
    key : 'chatRoomCount',
    default : 0,
});

export const chatRoomList = atom<ChatRoom[]|undefined>({
    key : 'chatRoomList',
    default : [],
});

export const myChatRoomList = atom<ChatRoom[]>({
    key : 'myChatRoomList',
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

export const chatRoomActiveStateList = atom<SetterOrUpdater<boolean>[]>({
    key : 'chatRoomActiveStateList',
    default : [],
});

export const allChatRoomList = atom<ChatRoom[]>({
    key : 'allChatRoomList',
    default : [],
});

export const chatRoomComponentList = atom<Record<string, JSX.Element >>({
    key : 'chatRoomComponentList',
    default : {},
});

export const currentChatRoom = atom<string>({
    key : 'currentChatRoom',
    default : '',
});

export const passWordInput = atom<(boolean|string)[]>({
    key : 'passWordInput',
    default : [false,''],
});