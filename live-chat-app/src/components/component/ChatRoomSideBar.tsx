import React from 'react'
import './ChatRoomSideBar.scss'
import logo from '../../../public/logo.png';

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


  return (
    <div className='chat-room-side-bar-wrapper'>
        <div className='main-button'><img src={logo} alt="logo" /></div>
        <div className='divier'/>
        <div className='chat-room-list'>
            <div className='chat-room'></div>
            <div className='chat-room'></div>
            <div className='chat-room'></div>
            <div className='chat-room'></div>
        </div>

    </div>
  )
}
