import React from 'react'
import { useRecoilState } from 'recoil';
import { dynamicBtnClass } from '../../../states/flagState';


export default function SideBarChatRoomButton(id: string) {




  const [isActive, setIsActive] = useRecoilState(dynamicBtnClass(id));
  const

  if (!setterList.includes(setIsActive)) {
    setterList.push(setIsActive);
  }

  function handleClick() {
    if (isActive === true) {
      setterList.forEach((setter) => {
        setter(true);
      })
      setIsActive(!isActive);
    }
  }


  return (
    <div key={id + '-wrapper'} className='chat-room-wrapper'>
      <div key={id} className={isActive ? 'chat-room-icon' : 'chat-room-icon button-clicked'} onClick={handleClick}><p>{id}</p></div>
      <div key={id + '-bar'} className={isActive ? 'chat-room-bar' : 'chat-room-bar bar-clicked'} />
    </div>
  )
}
