import { ChangeEvent } from 'react';
import './LogIn.scss';
import logo from '../../../images/logos/main-logo.png';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { loginFlag, welcomeFlag } from '../../../states/flagState';
import {chatRoomList} from '../../../states/chatRoomState';
import axios from '../../../common/api/axios';
import requests from '../../../common/api/requests';
import auth from '../../../common/auth/session';

import { userId, userPw } from '../../../states/userState';


export default function LogIn() {


    const setLoginFlag = useSetRecoilState(loginFlag);
    const setWelcomeFlag = useSetRecoilState(welcomeFlag);
    const setChatList = useSetRecoilState(chatRoomList);

    const [id, setId] = useRecoilState(userId);
    const [pw, setPw] = useRecoilState(userPw);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        // 새로운 값을 처리하는 로직
        if (event.target.id === 'id-input') {
            setId(event.target.value);
        } else {
            setPw(event.target.value);
        }
    }

    const resetState = () => {
        setId('');
        setPw('');
    }

    function signUpClickHandler() {
        setLoginFlag(false);
        resetState();
    }

    async function logInClickHandler(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();
        //로그인 정보 제출
        // POST 요청은 body에 실어 보냄
        try {
            const res = await axios.post(requests.postLogin, {
                userId: id,
                password: pw,
            });
            console.log(res.data);
            //발급된 JWT는 클라이언트 측에서 저장 - 세션 스토리지
            auth.setToken('accessToken', res.data.accessToken);
            auth.setToken('refreshToken', res.data.refreshToken);
            setWelcomeFlag(true);
        } catch (error) {
            resetState();
            alert('later make yeajung');
        }
    }
    //<button onClick={signUpClickHandler}>회원가입</button>
    return (
        <div>
            <div className='modal-back-drop'>
            </div>
            <form onSubmit={logInClickHandler}>
                <div className='login-frame' >
                    <img src={logo} alt="logo-white" />
                    <div className='p-input-wapper'>
                        <p>Username</p>
                        <input id='id-input' placeholder='Please enter your username' type="text" value={id} onChange={handleChange} />
                    </div>
                    <div className='p-input-wapper'>
                        <p>Password</p>
                        <input id='pw-input' placeholder='Please enter your password' type="password" value={pw} onChange={handleChange} />
                    </div>
                    <button className='login-button' type='submit'>LOGIN</button>
                    <div className='sign-up-button' onClick={signUpClickHandler}>Create an account!</div>
                </div>
            </form>
        </div>

    )
}
