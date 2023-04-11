import React from 'react'
import './MainPage.scss'


import { useRecoilValue } from 'recoil';

import { loginFlag } from '../../../states/flagState';

import LogIn from '../../modals/LogIn/LogIn';
import SignUp from '../../modals/SignUp/SignUp';

export default function MainPage() {

  
  const isLogin = useRecoilValue(loginFlag);

  function checkAuth() {
    return false;
  }


  return (
    <div className='main-page-wrapper'>
      {checkAuth() ? <p>Login Complete</p> : isLogin ? <LogIn /> : <SignUp />}
    </div>
  )
}
