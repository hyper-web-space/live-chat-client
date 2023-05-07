import './ChatRoomSideBar.scss'
import axios from '../../common/api/axios';
import requests from '../../common/api/requests';
import auth from '../../common/auth/session';
import logo from '../../../public/logo.png';
import plus from '../../images/components/plus.png'
import { useRecoilState, SetterOrUpdater, useRecoilValue } from 'recoil';
import { dynamicBtnClass, createChatRoomFlag } from '../../states/flagState';
import { myChatRoomList } from '../../states/chatRoomState';
import { userId } from '../../states/userState';
import { Link } from 'react-router-dom';


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
  const setterList: Array<SetterOrUpdater<boolean>> = [];
  const [chatRoomCreateFlag, setChatRoomCreateFlag] = useRecoilState(createChatRoomFlag);
  const [myChatRooms, setMyChatRooms] = useRecoilState<ChatRoom[]>(myChatRoomList);


  async function getMyChatRooms(offset: number, limit: number) {
    const token = auth.getToken('accessToken');

    try {
      const res = await axios.get(requests.getChatList,
        {
          params: {
            offset: offset,
            limit: limit,
            user_id : user_id,
          },
          headers: { 'AUTHORIZATION': `Bearer ${token}` }
        });
      setMyChatRooms(res.data.chatRooms);
    } catch (error) {
      alert(error);
    }
  }
  /**
   * id를 받아서 해당 id의 chatroom button component를 반환
   * @param id
   * @returns chatroom button component [wrapper, icon, bar]
   */

  function createMainButton() {

    const [isActive, setIsActive] = useRecoilState(dynamicBtnClass('main'));

    if (!setterList.includes(setIsActive)) {
      setterList.push(setIsActive);
    }

    function handleClick() {
      if (isActive === true) {
        setterList.forEach((setter) => {
          setter(true);
        })
        setIsActive(!isActive);
      }
    }

    return (
      <div className='chat-room-wrapper'>
        <Link to='/'>
          <div className={isActive ? 'main-button' : 'main-button button-clicked'} onClick={handleClick}><img src={logo} alt="logo" /></div>
        </Link>
        <div className={isActive ? 'chat-room-bar' : 'chat-room-bar bar-clicked'} />
      </div>
    )
  }

  function createChatRoomBtn() {

    function handleClick() {
      if (chatRoomCreateFlag !== false) {
        setChatRoomCreateFlag(false);
      }
    }

    return (
      <div className='chat-room-wrapper'>
        <div className='chat-room-icon' onClick={handleClick} ><img src={plus} alt="logo" /></div>
      </div>
    );
  }

  return (
    <div className='chat-room-side-bar-wrapper'>
      <div className='chat-room-list'>
        {createMainButton()}
        <div className='divder' />

        {createChatRoomBtn()}
      </div>
    </div>
  )
}
