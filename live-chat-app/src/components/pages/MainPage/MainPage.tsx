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
    {
      chatRoomId: '004',
      name: 'wog3w',
      creator: 'hyunbae',
      numberOfUser: 2,
      privateRoom: true,
    },
    {
      chatRoomId: '005',
      name: 'w3dow',
      creator: 'hyunbae',
      numberOfUser: 2,
      privateRoom: true,
    },
    {
      chatRoomId: '006',
      name: 'wow',
      creator: 'hyunbddae',
      numberOfUser: 2,
      privateRoom: true,
    },
    {
      chatRoomId: '007',
      name: 'wodw',
      creator: 'hyunbae',
      numberOfUser: 2,
      privateRoom: true,
    },
    {
      chatRoomId: '008',
      name: 'wow',
      creator: 'hyunbae',
      numberOfUser: 2,
      privateRoom: true,
    },
    {
      chatRoomId: '009',
      name: 'wow',
      creator: 'hyunbae',
      numberOfUser: 2,
      privateRoom: true,
    },
  ];

  function djb2(str: string) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 33) + str.charCodeAt(i);
    }
    return hash % 4 + 1;
  }

  const renderContents = () => {
    if (isWelcome) {
      return mockList.map((item: ChatRoom) => {
        return <div key={item.chatRoomId} className='chat-room'>
          <div className={`chat-room-image image${djb2(item.name)}`} />
          <div className='room-info-wrapper'>
            <h3 className='room-title'>{item.name}</h3>
            <div>
              <p className='room-creator'>{item.creator}</p>
              <p className='room-people-number'>{item.numberOfUser}</p>
            </div>
          </div>
        </div>;
      })
    }

    if (isLogin) {
      return <LogIn />
    }

    return <SignUp />

  }

  return (
    <div className='main-page-wrapper'>
      {renderContents()}
    </div>
  );
}
