import './MainPage.scss';
import axios from '../../../common/api/axios';

import { useRecoilValue, useRecoilState } from 'recoil';
import { loginFlag, welcomeFlag } from '../../../states/flagState';
import { chatRoomList, chatRoomCount, passWordInput ,ChatRoom,  } from '../../../states/chatRoomState';
import LogIn from '../../modals/LogIn/LogIn';
import SignUp from '../../modals/SignUp/SignUp';
import { useEffect } from 'react';
import ChatRoomJoinButton from '../../component/buttons/ChatRoomJoinButton';
import PassWordInput from '../../modals/PassWordInput/PassWordInput';

const axiosClient = new axios();

export default function MainPage() {

  //const user_id = useRecoilValue(userId);
  const isLogin = useRecoilValue(loginFlag);
  const isWelcome = useRecoilValue(welcomeFlag);

  const [passWordInputFlag, setPassWordInputFlag] = useRecoilState(passWordInput);
  const [roomCount,] = useRecoilState<number>(chatRoomCount);
  const [chatList ,setChatList]= useRecoilState(chatRoomList);

  useEffect(() => {
    axiosClient.getChatList(roomCount, 10).then(result => {
      const newChatList:ChatRoom[]|undefined = result;
      setChatList(newChatList);
    });
  }, [isWelcome]);


  const renderContents = () => {
    if (isWelcome && chatList) {
      return chatList.map((item: ChatRoom) => {
        return (
          <ChatRoomJoinButton key={item.chatRoomId}  chatRoomId ={item.chatRoomId} name ={item.name} numberOfUser = {item.numberOfUser} privateRoom = {item.privateRoom} />
        );
      })
    }

    if (isLogin) {
      return <LogIn />
    }
    return <SignUp />
  }

  return (
    <div className='main-page-wrapper'>
      { (passWordInputFlag[0]) ? <PassWordInput />: null }
      {renderContents()}
    </div>
  );
}
