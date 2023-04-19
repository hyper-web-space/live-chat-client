import './ChatRoomSideBar.scss'
import logo from '../../../public/logo.png';
import { useRecoilState , SetterOrUpdater } from 'recoil';
import { dynamicBtnClass } from '../../states/flagState';

export default function ChatRoomSideBar() {

  /*
  @GET /chatRoom
  [
  {
    'chatRoomId': 'string',
    'name': 'string',
    'creator': 'string',
    'numberOfUser': 'number',
    'privateRoom': 'boolean'
  },
  ...
  ]
  */
  const listData = ['legend', 'wow', 'lol', 'king'];
  const setterList: Array<SetterOrUpdater<boolean>> = [];


  function creareChatRoomButton(id: string) {

    const [isActive, setIsActive] = useRecoilState(dynamicBtnClass(id));

    if(!setterList.includes(setIsActive)){
      setterList.push(setIsActive);
    }

    function handleClick() {

      if(isActive===true){
        setterList.forEach((setter) => {
          setter(true);
        })
        setIsActive(!isActive);
      }
    }

    return (
    <div className='chat-room-wrapper'>
      <div className={isActive ? 'chat-room' : 'chat-room button-clicked'} onClick={handleClick} >{id} </div>
      <div className={isActive ? 'chat-room-bar' : 'chat-room-bar bar-clicked'} />
    </div>
    );
  }

  return (
    <div className='chat-room-side-bar-wrapper'>
      <div className='main-button'><img src={logo} alt="logo" /></div>
      <div className='divier' />
      <div className='chat-room-list'>
        {listData.map((id) => creareChatRoomButton(id))}
      </div>

    </div>
  )
}
