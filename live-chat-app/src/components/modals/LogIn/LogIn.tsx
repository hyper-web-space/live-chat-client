import React from 'react';
import './LogIn.scss';
import logo_white from '../../../../public/logo-white.png';

export default function LogIn() {
    return (

        <div>
            <div className='modal-back-drop'>
            </div>
            <div className='login-frame'>
                <div>
                    <img src={logo_white} alt="logo-white" />
                </div>
                <input placeholder='ID' type="text" />
                <input placeholder='Password' type="password" />
                <div>
                    <button>로그인</button>
                    <button>회원가입</button>
                </div>
            </div>
        </div>

    )
}
