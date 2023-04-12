import React, { ChangeEvent } from 'react';
import './LogIn.scss';
import logo_white from '../../../../public/logo-white.png';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { loginFlag } from '../../../states/flagState';
import axios from '../../../common/api/axios';
import requests from '../../../common/api/requests';
import auth from '../../../common/auth/session';

import { userId, userPw } from '../../../states/userState';


export default function LogIn() {


    const setLoginFlag = useSetRecoilState(loginFlag);

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

    function signUpClickHandler() {
        setLoginFlag(false);
    }

    /************************
    POST /users/signin
    
    id	string	사용자 아이디
    password	string	비밀번호

    {
    'accessToken': 'string',
    'refreshToken': 'string'
    }
    ************************/
    async function logInClickHandler() {
        //로그인 정보 제출
        // POST 요청은 body에 실어 보냄
        try {
            const res = await axios.post(requests.postLogin, {
                id: id,
                password: pw,
            });
            //발급된 JWT는 클라이언트 측에서 저장 - 세션 스토리지
            auth.setToken('accessToken', res.data.accessToken);
            auth.setToken('refreshToken', res.data.refreshToken);
        } catch (error) {
            alert('later make yeajung');
        }
    }

    return (
        <div>
            <div className='modal-back-drop'>
            </div>
            <div className='login-frame' >

                <div>
                    <img src={logo_white} alt="logo-white" />
                </div>
                <input id='id-input' placeholder='ID' type="text" value={id} onChange={handleChange} />
                <input id='pw-input' placeholder='Password' type="password" value={pw} onChange={handleChange} />
                <div>
                    <button onClick={logInClickHandler}>로그인</button>
                    <button onClick={signUpClickHandler}>회원가입</button>
                </div>
            </div>
        </div>

    )
}
