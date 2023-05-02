import './MainPage.scss';
import axios from '../../../common/api/axios';
import requests from '../../../common/api/requests';
import session from '../../../common/auth/session';

import { useRecoilValue, useRecoilState } from 'recoil';
import { loginFlag, welcomeFlag } from '../../../states/flagState';
import { chatRoomList } from '../../../states/chatRoomState';
import { userId } from '../../../states/userState';
import LogIn from '../../modals/LogIn/LogIn';
import SignUp from '../../modals/SignUp/SignUp';
import { Link } from 'react-router-dom';

export interface ChatRoom {
  chatRoomId: string;
  name: string;
  creator: string;
  numberOfUser: number;
  privateRoom: boolean;
}

export default function MainPage() {

  const user_id = useRecoilValue(userId);
  const isLogin = useRecoilValue(loginFlag);
  const isWelcome = useRecoilValue(welcomeFlag);
  
  const [chatList, setChatList] = useRecoilState<ChatRoom[]>(chatRoomList);
  const token = session.getToken('accessToken');
  const getChatList = async () => {
    try {
      const res = await axios.get<ChatRoom[]>(requests.getChatList,
        {headers: {'AUTHORIZATION': `Bearer ${token}` ,user_id: user_id}}
      );
      setChatList(res.data);
    } catch (error) {
      console.log(error);
    }
  };


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
          <Link to={'/chat-room'} key={item.chatRoomId}>
            <div key={item.chatRoomId} className='chat-room'>
              <div className={`chat-room-image image${djb2(item.name)}`} />
              <div className='room-info-wrapper'>
                <h3 className='room-title'>{item.name}</h3>
                <div>
                  <p className='room-creator'>{item.creator}</p>
                  <p className='room-people-number'>{item.numberOfUser}</p>
                </div>
              </div>
            </div>
          </Link>);
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
