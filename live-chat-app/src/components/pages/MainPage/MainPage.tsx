import React from 'react'
import './MainPage.scss'


import { useRecoilValue } from 'recoil';

import { loginFlag, welcomeFlag } from '../../../states/flagState';

import LogIn from '../../modals/LogIn/LogIn';
import SignUp from '../../modals/SignUp/SignUp';

export default function MainPage() {


  const isLogin = useRecoilValue(loginFlag);
  const isWelcome = useRecoilValue(welcomeFlag);


  return (
    <div className='main-page-wrapper'>
      {isWelcome ? <p>Login Complete</p> : isLogin ? <LogIn /> : <SignUp />}
    </div>
  )
}
