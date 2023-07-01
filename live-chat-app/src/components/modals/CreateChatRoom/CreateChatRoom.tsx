import './CreateChatRoom.scss'
import axios from '../../../common/api/axios';

import { useRecoilState, useRecoilValue } from 'recoil';
import { createChatRoomFlag } from '../../../states/flagState';
import { userId } from '../../../states/userState';
import { createChatRoomName, createChatRoomPassWord, createChatRoomPrivateYn } from '../../../states/chatRoomState';
import { useState } from 'react';

const axiosClient = new axios();

export default function CreateChatRoom() {

  const [signUpFlag, setSignUpFlag] = useState<boolean>(false);
  const [, setCreateChatRoom] = useRecoilState(createChatRoomFlag);
  const [chatRoomName, setChatRoomName] = useRecoilState(createChatRoomName);
  const [chatRoomPassWord, setChatRoomPassWord] = useRecoilState(createChatRoomPassWord);
  const [, setChatRoomPrivateYn] = useRecoilState(createChatRoomPrivateYn);
  const user_id = useRecoilValue(userId);

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    axiosClient.createChatRoom(chatRoomName, chatRoomPassWord, user_id).then(result => {
      console.log(result);
      setChatRoomName('');
      setChatRoomPassWord('');
      setCreateChatRoom(false);
      setChatRoomPrivateYn(false);
      setSignUpFlag(true);
    });
  }

  function returnSucessWindow() {

    return (
      <div className='create-chat-room-box'>
        <h1>축하합니다!</h1>
        <div onClick={() => { setCreateChatRoom(true) }}>나가기</div>
        <p>채팅방이 만들어졌습니다.</p>
        <button onClick={() => { setCreateChatRoom(true) }}>확인</button>
      </div>
    )
  }

  function returnChatRoomContents() {
    return (
      <div className='create-chat-room-box'>
        <form onSubmit={submitHandler}>
          <p>Chatroom Name</p>
          <input
            onChange={(e) => {
              const val: string = e.target.value;
              setChatRoomName(val);
            }}
            value={chatRoomName}
            type="text" />
          <p></p>
          <p>Chatroom Password</p>
          <input
            onChange={(e) => {
              const val: string = e.target.value;
              setChatRoomPassWord(val);
            }}
            value={chatRoomPassWord}
            placeholder='If you want to create a public room, do not enter a password'
            type="password" />
          <button className='chat-room-create-button' type='submit'>CREATE!!</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <div className='modal-back-drop'>
      </div>
      {signUpFlag ? returnSucessWindow() : returnChatRoomContents()}
    </div>
  )
}
