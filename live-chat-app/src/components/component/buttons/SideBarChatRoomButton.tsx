import { useRecoilState, SetterOrUpdater } from 'recoil';
import { dynamicBtnClass } from '../../../states/flagState';
import { chatRoomActiveStateList, currentChatRoom} from '../../../states/chatRoomState';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SideBarChatRoomButton({ id, name }: { id: string, name: string }): JSX.Element {


  const [isActive, setIsActive] = useRecoilState(dynamicBtnClass(id));
  const [, setCurrentChatRoomId] = useRecoilState(currentChatRoom);
  const [activeChatRoomList, setActiveChatRoomList] = useRecoilState(chatRoomActiveStateList);

  //가설 1 동시성 이슈
  useEffect(()=>{
    if (!activeChatRoomList.includes(setIsActive)) {
      const newList: SetterOrUpdater<boolean>[] = [...activeChatRoomList, setIsActive];
      setActiveChatRoomList(newList);
    }
  },[isActive])


  function handleClick() {
    if (isActive === true) {
      activeChatRoomList.forEach((setter) => {
        setter(true);
      })
      setIsActive(!isActive);
    }
    setTimeout(() => {
      setCurrentChatRoomId(id);
    }
      , 0);
  }

  return (
    <Link to = '/chat-room'>
    <div key={id + '-wrapper'} className='chat-room-wrapper'>
      <div key={id} className={isActive ? 'chat-room-icon' : 'chat-room-icon button-clicked'} onClick={handleClick}><p>{name}</p></div>
      <div key={id + '-bar'} className={isActive ? 'chat-room-bar' : 'chat-room-bar bar-clicked'} />
    </div>
    </Link>
  )
}
