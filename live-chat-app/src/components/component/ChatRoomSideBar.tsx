import React from 'react'
import './ChatRoomSideBar.scss'
import logo from '../../../public/logo.png';
import { useRecoilState } from 'recoil';
import { dynamicBtnClass } from '../../states/flagState';

export default function ChatRoomSideBar() {

  /*
  @GET /chatRoom
  [
  {
    'chatRoomId': 'string',
    'name': 'string',
    'creator': 'string',
    'numberOfUser': 'number',
    'privateRoom': 'boolean'
  },
  ...
  ]
  */
  const listData = ['legend', 'wow', 'lol', 'king'];

  function creareChatRoomButton(id: string) {

    const [isActive, setIsActive] = useRecoilState(dynamicBtnClass(id));

    function handleClick() {
      setIsActive(!isActive);
    }

    return (
      <div className={isActive ? 'chat-room' : 'chat-room clicked'} onClick={handleClick} >{id} </div>
    );
  }

  return (
    <div className='chat-room-side-bar-wrapper'>
      <div className='main-button'><img src={logo} alt="logo" /></div>
      <div className='divier' />
      <div className='chat-room-list'>
        {listData.map((id) => creareChatRoomButton(id))}
      </div>

    </div>
  )
}
