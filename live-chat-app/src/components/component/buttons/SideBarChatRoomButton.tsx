import { useRecoilState } from 'recoil';
import {  currentChatRoom} from '../../../states/chatRoomState';
import { Link } from 'react-router-dom';

/**
  각 버튼은 {id} 를 prop 으로 받아서 유니크하게 가지고 있음
*/
export default function SideBarChatRoomButton({ id, name }: { id: string, name: string }): JSX.Element {

  const [currentChatRoomId, setCurrentChatRoomId] = useRecoilState(currentChatRoom);

  function handleClick() {
    // 버튼 클릭시 해당 버튼의 id 를 recoil state 에 저장함
    setCurrentChatRoomId(id);
  }

  // 이 방의 id 와 recoil state 를 비교해서 버튼이 선택되었는 지 확인
  const isSelected: boolean = id === currentChatRoomId

  // 버튼이 선택되었다면 선택된 버튼에 해당하는 className 으로 사용
  return (
    <Link key={`${id}-wrapper`} className='chat-room-wrapper' to = '/chat-room'>
      <div key={id} className={isSelected ? 'chat-room-icon button-clicked' : 'chat-room-icon'} onClick={handleClick}>
        <p>{name}</p>
      </div>
      <div key={`${id}-bar`} className={isSelected ? 'chat-room-bar bar-clicked' : 'chat-room-bar'} />
    </Link>
  )
}
