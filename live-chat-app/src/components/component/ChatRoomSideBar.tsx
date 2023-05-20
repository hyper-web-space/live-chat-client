import './ChatRoomSideBar.scss'
import axios from '../../common/api/axios';
import requests from '../../common/api/requests';
import auth from '../../common/auth/session';
import { useRecoilState, useRecoilValue } from 'recoil';
import { welcomeFlag } from '../../states/flagState';
import { myChatRoomList,chatRoomComponentList } from '../../states/chatRoomState';
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
  const [chatRoomComponent, setChatRoomComponent] = useRecoilState(chatRoomComponentList);

  // [isWelcome] 넣는게 맞는가..?
  // Paging 구현 아직안함
  useEffect(() => {
    getMyChatRooms(0, 10)
    .then(result => {
      setUpChatRoomComponet(result);
      return result;
    })
    .then(result => {
      setMyChatRooms(result);
    })
  }, [isWelcome]);

  /*
    ChatRoomComponent Update가 필요한지 체크하는 로직이
    현재 매우매우 형편없음. 개선必
  */
  function setUpChatRoomComponet(list: ChatRoom[]) {
    const newComp: Record<string, JSX.Element> = {};
    list.map((chatRoom) => {
      if(!chatRoomComponent[chatRoom.chatRoomId]){
        newComp[chatRoom.chatRoomId] = <ChatRoom id={chatRoom.chatRoomId}/>;
      }
    })
    if( Object.keys(newComp).length !== 0){
      list.map((chatRoom) => {
        if(!chatRoomComponent[chatRoom.chatRoomId]){
          newComp[chatRoom.chatRoomId] = <ChatRoom id={chatRoom.chatRoomId}/>;
        }
      })
      setChatRoomComponent(newComp);
    }
  }

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
      return res.data.chatRooms;
    } catch (error) {
      alert(error);
    }
    return [];
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
