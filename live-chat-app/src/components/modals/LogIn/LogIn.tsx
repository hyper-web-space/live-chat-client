import { ChangeEvent } from 'react';
import './LogIn.scss';
import logo from '../../../images/logos/main-logo.png';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { loginFlag, welcomeFlag } from '../../../states/flagState';
import axios from '../../../common/api/axios';

import { userId, userPw } from '../../../states/userState';


export default function LogIn() {

    const axiosClient = new axios();
    const setLoginFlag = useSetRecoilState(loginFlag);
    const setWelcomeFlag = useSetRecoilState(welcomeFlag);

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
        axiosClient.logIn(event, id, pw,setWelcomeFlag).catch(() => {
            resetState();
        })

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
