/*
id	        string	20자 이하, 중복 불가
password	string	비밀번호
 */

import { atom,selector } from 'recoil';

export const userId = atom({
    key : 'userId',
    default : "",
});

export const userPw = atom({
    key : 'userPw',
    default : "",
});

export const filteredTodoListState = selector({
    key: 'filteredTodoListState',
    get: ({get}) => {
      const id = get(userId);
      const pw = get(userPw);

      return id + pw;
  
    },
  });
