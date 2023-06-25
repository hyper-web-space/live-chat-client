/*
  자체 모듈 import 선언부
*/
import './ChatRoomSideBar.scss'
import axios from '../../common/api/axios';


/*
  React 연관 import 선언부
*/ 
import { useRecoilState, useRecoilValue } from 'recoil';
import { myChatRoomList,chatRoomComponentList,ChatRoom,compareArrays } from '../../states/chatRoomState';
import { userId } from '../../states/userState';
import { useEffect } from 'react';

/*
  components import 선언부
*/
import SideBarChatRoomButton from './buttons/SideBarChatRoomButton';
import SideBarCreateChatRoomButton from './buttons/SideBarCreateChatRoomButton';
import SideBarMainButton from './buttons/SideBarMainButton';
import ChatingRoom from '../pages/ChatRoom/ChatingRoom';

/*
  stomp import 선언부
*/
import stomp from '../../common/api/stomp';


const client = stomp.getInstance();
const axiosClient = new axios();

export default function ChatRoomSideBar() {

  const user_id = useRecoilValue(userId);
  const [myChatRooms, setMyChatRooms] = useRecoilState<ChatRoom[]>(myChatRoomList);
  const [chatRoomComponent, setChatRoomComponent] = useRecoilState(chatRoomComponentList);

  // Paging 구현 아직안함
  useEffect(() => {
    axiosClient.getMyChatRooms(user_id,0, 10)
    .then(result => {
      console.log('1번마.');
      setUpChatRoomComponet(result);
      return result;
    })
    .then(result => {
      console.log('진입.');
      if (compareArrays(result,myChatRooms)) {
        console.log('뚫림.');
        setMyChatRooms(result);
      }
      return result;
    })
    .then(() => {
      // 아직 타이밍 살짝 늦음.
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
      prev[current.chatRoomId] = <ChatingRoom id ={current.chatRoomId}/>
      return prev
    },{} as Record<string, JSX.Element>);
    console.log(newComp);
    if(Object.keys(newComp).length === 0){
      return;
    }else{
      const setComp: Record<string, JSX.Element> = {...chatRoomComponent ,...newComp}
      setChatRoomComponent(setComp);
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
