/*
  자체 모듈 import 선언부
*/
import './ChatRoomSideBar.scss'
import axios from '../../common/api/axios';
import requests from '../../common/api/requests';
import auth from '../../common/auth/session';

/*
  React 연관 import 선언부
*/ 
import { useRecoilState, useRecoilValue } from 'recoil';
import { myChatRoomList,chatRoomComponentList } from '../../states/chatRoomState';
import { userId } from '../../states/userState';
import { useEffect } from 'react';

/*
  components import 선언부
*/
import SideBarChatRoomButton from './buttons/SideBarChatRoomButton';
import SideBarCreateChatRoomButton from './buttons/SideBarCreateChatRoomButton';
import SideBarMainButton from './buttons/SideBarMainButton';
import ChatRoom from '../pages/ChatRoom/ChatRoom';

/*
  stomp import 선언부
*/
import stomp from '../../common/api/stomp';


const client = stomp.getInstance();

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
  const [myChatRooms, setMyChatRooms] = useRecoilState<ChatRoom[]>(myChatRoomList);
  const [chatRoomComponent, setChatRoomComponent] = useRecoilState(chatRoomComponentList);

  // Paging 구현 아직안함
  useEffect(() => {
    getMyChatRooms(0, 10)
    .then(result => {
      setUpChatRoomComponet(result);
      return result;
    })
    .then(result => {
      setMyChatRooms(result);
      return result;
    })
    .then(() => {
      myChatRooms.forEach((chatRoom) => {
        client.subscribeChatRoom(chatRoom.chatRoomId);
      });
    })
  }, []);

  /*
    ChatRoomComponent Update가 필요한지 체크하는 로직
  */
  function setUpChatRoomComponet(list: ChatRoom[]) {
    const newComp: Record<string, JSX.Element> = list
    .filter((chatRoom) => !chatRoomComponent[chatRoom.chatRoomId])
    .reduce((prev, current)=>{
      prev[current.chatRoomId] = <ChatRoom id ={current.chatRoomId}/>
      return prev
    },{} as Record<string, JSX.Element>);

    if(Object.keys(newComp).length === 0){
      return;
    }

    setChatRoomComponent(newComp);
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
