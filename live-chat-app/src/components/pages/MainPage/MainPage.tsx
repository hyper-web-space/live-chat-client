import './MainPage.scss';
import axios from '../../../common/api/axios';
import requests from '../../../common/api/requests';
import { useRecoilValue, useRecoilState } from 'recoil';
import { loginFlag, welcomeFlag } from '../../../states/flagState';
import { chatRoomList } from '../../../states/chatRoomState';
import LogIn from '../../modals/LogIn/LogIn';
import SignUp from '../../modals/SignUp/SignUp';

export interface ChatRoom {
  chatRoomId: string;
  name: string;
  creator: string;
  numberOfUser: number;
  privateRoom: boolean;
}

export default function MainPage() {
  const isLogin = useRecoilValue(loginFlag);
  const isWelcome = useRecoilValue(welcomeFlag);
  const [chatList, setChatList] = useRecoilState<ChatRoom[]>(chatRoomList);

  const getChatList = async () => {
    try {
      const res = await axios.get<ChatRoom[]>(requests.getChatList);
      setChatList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const mockList: ChatRoom[] = [
    {
      chatRoomId: '001',
      name: 'legendary',
      creator: 'hyunbae',
      numberOfUser: 3,
      privateRoom: false,
    },
    {
      chatRoomId: '002',
      name: 'king',
      creator: 'chung',
      numberOfUser: 3,
      privateRoom: false,
    },
    {
      chatRoomId: '003',
      name: 'wow',
      creator: 'hyunbae',
      numberOfUser: 2,
      privateRoom: true,
    },
  ];

  const renderContents = () => {
    if(isWelcome){
      return mockList.map((item: ChatRoom) => {
        return <div key={item.chatRoomId} className='chat-room'>
          <h3>{item.name}</h3>
          <p>{item.creator}</p>
          <p>{item.numberOfUser}</p>
        </div>;
      })
    }

    if(isLogin){
      return <LogIn/>
    }

    return <SignUp/>
  
  }

  return (
    <div className='main-page-wrapper'>
      {renderContents()}
    </div>
  );
}
