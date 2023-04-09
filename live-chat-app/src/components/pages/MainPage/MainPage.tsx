import React from 'react'
import './MainPage.scss'


import { useRecoilState, useRecoilValue } from 'recoil';
import { userId } from '../../../states/userState';

import LogIn from '../../modals/LogIn/LogIn';

export default function MainPage() {

  const [id, setId] = useRecoilState(userId);

  function checkAuth() {

    return false;
  }

  function clickHandler() {
    setId("hyunbae");
  }

  return (
    <div className='main-page-wrapper'>
      {checkAuth() ? <p>Login Complete</p> : <LogIn />}
    </div>
  )
}
