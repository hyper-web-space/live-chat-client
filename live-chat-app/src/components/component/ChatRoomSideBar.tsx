import './ChatRoomSideBar.scss'
import axios from '../../common/api/axios';
import requests from '../../common/api/requests';
import auth from '../../common/auth/session';
import { useRecoilState, useRecoilValue } from 'recoil';
import { welcomeFlag } from '../../states/flagState';
import { myChatRoomList } from '../../states/chatRoomState';
import { userId } from '../../states/userState';
//import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import SideBarChatRoomButton from './buttons/SideBarChatRoomButton';
import SideBarCreateChatRoomButton from './buttons/SideBarCreateChatRoomButton';
import SideBarMainButton from './buttons/SideBarMainButton';
import ChatRoom from '../pages/ChatRoom/ChatRoom';

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

export default function ChatRoomSideBar() {

  const user_id = useRecoilValue(userId);
  const isWelcome = useRecoilValue(welcomeFlag);
  const [myChatRooms, setMyChatRooms] = useRecoilState<ChatRoom[]>(myChatRoomList);


  useEffect(() => {
    getMyChatRooms(0, 10);
  }, [isWelcome]);

  /*  
  if(!activeChatRoomComponentList[id]){
    const newcomponert = {id:<ChatRoom id={id}/> }
    const newComponentList = {...activeChatRoomComponentList,newcomponert};
    setActiveChatRoomComponentList(newComponentList);
  }
  */

  async function getMyChatRooms(offset: number, limit: number) {
    const token = auth.getToken('accessToken');

    try {
      const res = await axios.get(requests.getChatList,
        {
          params: {
            offset: offset,
            limit: limit,
            user_id: user_id,
          },
          headers: { 'AUTHORIZATION': `Bearer ${token}` }
        });
      setMyChatRooms(res.data.chatRooms);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className='chat-room-side-bar-wrapper'>
      <div className='chat-room-list'>
        <SideBarMainButton />
        <div className='divder' />
        {myChatRooms.map((chatRoom) => (
          <SideBarChatRoomButton name={chatRoom.name} id={chatRoom.chatRoomId} key={chatRoom.chatRoomId} />
        ))}
        <SideBarCreateChatRoomButton />
      </div>
    </div>
  )
}
