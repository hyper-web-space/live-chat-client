import { Outlet, Route, Routes } from 'react-router-dom';
import './App.scss'
import Nav from './components/component/Nav';
import ChatRoomSideBar from './components/component/ChatRoomSideBar';
import UserSideBar from './components/component/UserSideBar';
import MainPage from './components/pages/MainPage/MainPage';
import CreateChatRoom from './components/modals/CreateChatRoom/CreateChatRoom';

import { useRecoilValue } from 'recoil';
import { createChatRoomFlag ,welcomeFlag } from '../src/states/flagState';
import {chatRoomComponentList,currentChatRoom} from '../src/states/chatRoomState';

function App() {

  const createChatRoom = useRecoilValue(createChatRoomFlag);
  const currentChatRoomId = useRecoilValue(currentChatRoom);
  const chatRoomComponent = useRecoilValue(chatRoomComponentList);
  const isWelcome = useRecoilValue(welcomeFlag);

  // 로그인된지 확인

  const Layout = () => {
    
    /*
     dummy background
    */ 
    if(!isWelcome){
      return (
        <div className='main-wrapper'>
          <div className='upper-wrapper'>
            <Nav />
          </div>
          <div className='lower-wrapper'>
            <UserSideBar />
            <Outlet/>
          </div>
        </div>
      );
    }

    return (
      <div className='main-wrapper'>
        <div className='upper-wrapper'>
          <Nav />
        </div>
        <div className='lower-wrapper'>
          <ChatRoomSideBar />
          <Outlet/>
        </div>
      </div>
    );
  };
 
  return (
    <div className="App">
      {createChatRoom ?  '': <CreateChatRoom />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/chat-room" element={chatRoomComponent[currentChatRoomId]}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
