
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

export function compareArrays(arr1:ChatRoom[], arr2:ChatRoom[]) {
    if (arr1.length !== arr2.length) {
      return true; // 배열의 길이가 다르면 다른 배열로 판단
    }
  
    for (let i = 0; i < arr1.length; i++) {
      const obj1 = arr1[i];
      const obj2 = arr2[i];
      if (obj1.chatRoomId !== obj2.chatRoomId){
        return true; // 객체의 id 값이 다르면 다른 배열로 판단
      }
    }
    return false;
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