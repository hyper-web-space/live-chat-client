import logo from '../../../../public/logo.png';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { chatRoomActiveStateList } from '../../../states/chatRoomState';
import { dynamicBtnClass } from '../../../states/flagState';
import { useEffect } from 'react';


export default function SideBarMainButton() {


    const [isActive, setIsActive] = useRecoilState(dynamicBtnClass('main'));
    const [activeChatRoomList, setActiveChatRoomList] = useRecoilState(chatRoomActiveStateList);

    useEffect(() => {
        if (!activeChatRoomList.includes(setIsActive)) {
            setActiveChatRoomList([...activeChatRoomList, setIsActive])
        }
    }, []);

    function handleClick() {
        if (isActive === true) {
            activeChatRoomList.forEach((setter) => {
                setter(true);
            })
            setIsActive(!isActive);
        }
    }

    return (
        <div className='chat-room-wrapper'>
            <Link to='/'>
                <div className={isActive ? 'main-button' : 'main-button button-clicked'} onClick={handleClick}><img src={logo} alt="logo" /></div>
            </Link>
            <div className={isActive ? 'chat-room-bar' : 'chat-room-bar bar-clicked'} />
        </div>
    )
}
