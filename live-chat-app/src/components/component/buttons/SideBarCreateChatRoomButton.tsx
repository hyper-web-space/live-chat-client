
import plus from '../../../images/components/plus.png'
import { useRecoilState } from 'recoil';
import { createChatRoomFlag } from '../../../states/flagState';

export default function SideBarCreateChatRoomButton() {


    const [chatRoomCreateFlag, setChatRoomCreateFlag] = useRecoilState(createChatRoomFlag);

    function handleClick() {
        if (chatRoomCreateFlag !== false) {
            setChatRoomCreateFlag(false);
        }
    }

    return (
        <div className='chat-room-wrapper'>
            <div className='chat-room-icon' onClick={handleClick} ><img src={plus} alt="logo" /></div>
        </div>
    );
}
