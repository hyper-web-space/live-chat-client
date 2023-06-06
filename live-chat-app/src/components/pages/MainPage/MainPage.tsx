import './MainPage.scss';
import axios from '../../../common/api/axios';
import requests from '../../../common/api/requests';
import session from '../../../common/auth/session';

import { useRecoilValue, useRecoilState } from 'recoil';
import { loginFlag, welcomeFlag } from '../../../states/flagState';
import { chatRoomList, chatRoomCount } from '../../../states/chatRoomState';
import LogIn from '../../modals/LogIn/LogIn';
import SignUp from '../../modals/SignUp/SignUp';
import { useEffect } from 'react';

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

export default function MainPage() {

  //const user_id = useRecoilValue(userId);
  const isLogin = useRecoilValue(loginFlag);
  const isWelcome = useRecoilValue(welcomeFlag);

  const [roomCount,] = useRecoilState<number>(chatRoomCount);
  const [chatList, setChatList] = useRecoilState<ChatRoom[]>(chatRoomList);
  const token= session.getToken('accessToken');

  useEffect(() => {
    getChatList(roomCount, 10);
  }, [isWelcome]);

  //query chat list
  const getChatList = async (offset: number, limit: number): Promise<void> => {
    if (!session.checkToken('accessToken')) {
      return;
    }
    try {
      const res = await axios.get<ChatRooms>(requests.chatRooms,
        {
          params: {
            offset: offset,
            limit: limit
          },
          headers: { 'AUTHORIZATION': `Bearer ${token}` }
        }
      );
      setChatList(res.data.chatRooms);
    } catch (error) {
      console.log(error);
    }
  }

  //random image generator func
  function djb2(str: string) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 33) + str.charCodeAt(i);
    }
    return hash % 4 + 1;
  }
  const renderContents = () => {
    if (isWelcome) {
      return chatList.map((item: ChatRoom) => {
        return (
          <div key={item.chatRoomId} className={'chat-room'}>
            <div className={`chat-room-image color${djb2(item.name)}`} >
              <div className={item.privateRoom ? 'private-chat' : 'public-chat'} />
            </div>
            <div className='room-info-wrapper'>
              <h3 className='room-title'>{item.name}</h3>
              <div>
                <div className='user-icon' />
                <p className='room-people-number'>{item.numberOfUser}</p>
              </div>
            </div>
          </div>
        );
      })
    }

    if (isLogin) {
      return <LogIn />
    }
    return <SignUp />

  }

  return (
    <div className='main-page-wrapper'>
      {renderContents()}
    </div>
  );
}
