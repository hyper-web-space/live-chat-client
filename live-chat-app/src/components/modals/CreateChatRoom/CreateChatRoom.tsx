import './CreateChatRoom.scss'
import axios from '../../../common/api/axios';
import requests from '../../../common/api/requests';
import auth from '../../../common/auth/session';

import { useRecoilState, useRecoilValue } from 'recoil';
import { createChatRoomFlag } from '../../../states/flagState';
import { userId } from '../../../states/userState';
import { createChatRoomName, createChatRoomPassWord, createChatRoomPrivateYn } from '../../../states/chatRoomState';
import { useState } from 'react';

export default function CreateChatRoom() {

  const [signUpFlag, setSignUpFlag] = useState<boolean>(false);
  const [, setCreateChatRoom] = useRecoilState(createChatRoomFlag);
  const [chatRoomName, setChatRoomName] = useRecoilState(createChatRoomName);
  const [chatRoomPassWord, setChatRoomPassWord] = useRecoilState(createChatRoomPassWord);
  const [chatRoomPrivateYn, setChatRoomPrivateYn] = useRecoilState(createChatRoomPrivateYn);
  const user_id = useRecoilValue(userId);

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = auth.getToken('accessToken');

    try {
      await axios.post(requests.chatRooms,
        {
          name: chatRoomName,
          password: chatRoomPassWord,
        }, {
        headers: {
          'AUTHORIZATION': `Bearer ${token}`
          , user_id: user_id
        }
      });

      setChatRoomName('');
      setChatRoomPassWord('');
      setCreateChatRoom(false);
      setChatRoomPrivateYn(false);
      setSignUpFlag(true);

    } catch (error) {

      alert(error);
    }


    console.log(event.target);
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
<<<<<<< Updated upstream
        <h1>채팅방 만들기</h1>
        <div onClick={() => { setCreateChatRoom(true) }}>나가기</div>
        <p>지금 바로 채팅방을 만들어 보세요. 비밀번호 설정도 가능하답니다.</p>
=======
>>>>>>> Stashed changes
        <form onSubmit={submitHandler}>
          <p>채팅방 이름</p>
          <input
            onChange={(e) => {
              const val: string = e.target.value;
              setChatRoomName(val);
            }}
            value={chatRoomName}
            type="text" />
          <p></p>
          <div>
            <label>
              <input
                type="radio"
                checked={chatRoomPrivateYn === false}
                onClick={() => { setChatRoomPrivateYn(false) }}
              />
              공개
            </label>
            <label>
              <input
                type="radio"
                checked={chatRoomPrivateYn === true}
                onClick={() => { setChatRoomPrivateYn(true) }}
                
              />
              비공개
            </label>
          </div>
          <p>비밀번호</p>
          <input
            onChange={(e) => {
              const val: string = e.target.value;
              setChatRoomPassWord(val);
            }}
            value={chatRoomPassWord}
<<<<<<< Updated upstream
            type="password" />
          <button type='submit'>만들기</button>
=======
            type="password" 
            placeholder='If you want a public room, do not enter a password'/>
          <button className='chat-room-create-button' type='submit'>CREATE!!</button>
>>>>>>> Stashed changes
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
