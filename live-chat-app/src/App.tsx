import { useState } from 'react'
import { Outlet, Route, Routes } from "react-router-dom";
import './App.scss'
import Nav from './components/component/Nav';
import ChatRoomSideBar from './components/component/ChatRoomSideBar';
import UserSideBar from './components/component/UserSideBar';
import MainPage from './components/pages/MainPage/MainPage';
import ChatRoom from './components/pages/ChatRoom/ChatRoom';

function App() {

  const Layout = () => {
    return (
      <div className='main-wrapper'>
        <div className='upper-wrapper'>
          <Nav/>
        </div>
        <div className='lower-wrapper'>
          <ChatRoomSideBar/>
          <UserSideBar/>
          <Outlet/>
        </div>             
      </div>
    );
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<MainPage/>} />
          <Route path="/chat-room" element={<ChatRoom/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
