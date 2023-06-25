import './PassWordInput.scss';
import { ChangeEvent } from 'react';
//import axios from '../../../common/api/axios';


import { useRecoilState } from 'recoil';
import { passWordInput } from '../../../states/chatRoomState';

export default function PassWordInput() {

    const [passWordInputFlag, setPassWordInputFlag] = useRecoilState(passWordInput);

    function joinChatRoom(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();
    }

    function exit() {
        const newState=[false,passWordInputFlag[1]]
        setPassWordInputFlag(newState);
    }   

    function setPassWord(event:ChangeEvent<HTMLInputElement>) {
        const newPassWordInputFlag=[passWordInputFlag[0],event.target.value]
        setPassWordInputFlag(newPassWordInputFlag);
    }
        
    
    return (
        <div className='password-box'>
            <form onSubmit={joinChatRoom}>
                <input type="password" placeholder="비밀번호를 입력하세요" onChange={setPassWord} />
                <div className='button-wrapper'>
                    <button>확인</button>
                    <button className='exit-button' onClick={exit}>나가기</button>
                </div>
            </form>
        </div>
    )
}
