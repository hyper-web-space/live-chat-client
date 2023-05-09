import { useRecoilState, SetterOrUpdater } from 'recoil';
import { dynamicBtnClass } from '../../../states/flagState';
import {chatRoomActiveStateList} from '../../../states/chatRoomState';


export default function SideBarChatRoomButton({id,name} : {id:string,name:string}) : JSX.Element {


  const [isActive, setIsActive] = useRecoilState(dynamicBtnClass(id));
  const [activeChatRoomList, setActiveChatRoomList] = useRecoilState(chatRoomActiveStateList);

  if (!activeChatRoomList.includes(setIsActive)) {
    const newList:SetterOrUpdater<boolean>[] = [...activeChatRoomList, setIsActive];
    setActiveChatRoomList(newList);
  }

  function handleClick() {
    if (isActive === true) {
      activeChatRoomList.forEach((setter) => {
        setter(true);
      })
      setIsActive(!isActive);
    }
  }


  return (
    <div key={id + '-wrapper'} className='chat-room-wrapper'>
      <div key={id} className={isActive ? 'chat-room-icon' : 'chat-room-icon button-clicked'} onClick={handleClick}><p>{name}</p></div>
      <div key={id + '-bar'} className={isActive ? 'chat-room-bar' : 'chat-room-bar bar-clicked'} />
    </div>
  )
}
