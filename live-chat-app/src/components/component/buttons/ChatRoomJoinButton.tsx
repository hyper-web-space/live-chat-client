import React from 'react'
import axios from '../../../common/api/axios';
import requests from '../../../common/api/requests';
import auth from '../../../common/auth/session';

import { useRecoilValue,useRecoilState } from 'recoil';
import { userId } from '../../../states/userState';
import { passWordInput } from '../../../states/chatRoomState';

export default function ChatRoomJoinButton({ chatRoomId, name, numberOfUser, privateRoom }:
    { chatRoomId: string, name: string, numberOfUser: number, privateRoom: boolean }) {

    const user_id = useRecoilValue(userId);
    const [passWordInputFlag, setPassWordInputFlag] = useRecoilState(passWordInput);

    async function joinChatRoom(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {

        if(privateRoom){
            const newState = [true,'']
            setPassWordInputFlag(newState);
            return false
        }

        const token = auth.getToken('accessToken');

        try {
            await axios.post(requests.chatRooms + `/${chatRoomId}`,
                {
                    password: ''
                }, {
                headers: {
                    'AUTHORIZATION': `Bearer ${token}`
                    , user_id: user_id
                }
            });
        } catch (error) {
            alert(error);
        }
        console.log(event.target);
    }


    //random image generator func
    function djb2(str: string) {
        let hash = 5381;
        for (let i = 0; i < str.length; i++) {
            hash = (hash * 33) + str.charCodeAt(i);
        }
        return hash % 4 + 1;
    }

    return (
        <div key={chatRoomId} className={'chat-room'} onClick={joinChatRoom}>
            <div className={`chat-room-image color${djb2(name)}`} >
                <div className={privateRoom ? 'private-chat' : 'public-chat'} />
            </div>
            <div className='room-info-wrapper'>
                <h3 className='room-title'>{name}</h3>
                <div>
                    <div className='user-icon' />
                    <p className='room-people-number'>{numberOfUser}</p>
                </div>
            </div>
        </div>
    )
}
