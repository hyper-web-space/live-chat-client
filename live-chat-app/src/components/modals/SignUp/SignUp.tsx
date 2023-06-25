import { ChangeEvent } from 'react';
import './SignUp.scss'
import logo from '../../../images/logos/welcome-logo.png';
import arrow from '../../../../public/left-arrow.png';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { loginFlag } from '../../../states/flagState';
import axios from '../../../common/api/axios';


import { userId, userPw } from '../../../states/userState';


export default function SignUp() {
  const axiosClient = new axios();
  const setLoginFlag = useSetRecoilState(loginFlag);
  const [id, setId] = useRecoilState(userId);
  const [pw, setPw] = useRecoilState(userPw);

  function idChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setId(event.target.value);
  }

  function passWordChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setPw(event.target.value);
  }

  function arrowClickHandler() {
    setLoginFlag(true);
    resetState()
  }

  async function signUpClickHandler() {
    // 회원가입 정보 제출
    // POST 요청은 body에 실어 보냄
    axiosClient.signUp(id, pw,setLoginFlag);
  }

  const resetState = () => {
    setId('');
    setPw('');
  }

  return (
    <div>
      <div className='modal-back-drop'>
      </div>
      <div className='sign-up-frame'>
        <img className='arrow' src={arrow} alt="arrow" onClick={arrowClickHandler} />
        <img className='logo' src={logo} alt="logo-white" />
        <form onSubmit={signUpClickHandler}>
          <p>Please Input your ID/PW</p>
          <div className='combo-container'>
            <p>Username</p>
            <input onChange={idChangeHandler} placeholder='ID' type="text" />
          </div>
          <div className='combo-container'>
            <p>Password</p>
            <input onChange={passWordChangeHandler} placeholder='Password' type="password" />
          </div>
          <div>
            <button type='submit'>SIGNUP</button>
          </div>
        </form>
      </div>
    </div>

  )
}
