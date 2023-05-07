import { ChangeEvent } from 'react';
import './SignUp.scss'
import logo from '../../../images/logos/welcome-logo.png';
import arrow from '../../../../public/left-arrow.png';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { loginFlag } from '../../../states/flagState';
import axios from '../../../common/api/axios';
import requests from '../../../common/api/requests';


import { userId, userPw } from '../../../states/userState';


export default function SignUp() {

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
    try {
      console.log(id, pw);
      await axios.post(requests.postSignUp, {
        userId: id,
        password: pw,
      })

      setLoginFlag(true);
      alert('회원가입이 완료되었습니다.');
    } catch (error) {
      console.log(error);
      alert('later make yeajung');
    }
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
