import './ChatRoomSideBar.scss'
import logo from '../../../public/logo.png';
import plus from '../../images/components/plus.png'
import { useRecoilState, SetterOrUpdater } from 'recoil';
import { dynamicBtnClass,createChatRoomFlag } from '../../states/flagState';
import { Link } from 'react-router-dom';

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
  /*
  [v] 지금 내가 어떻게 클릭 풀리게 하는지 로직 다시 파악
     - state각자 적용, list에 넣어서 관리.
  [] 메인버튼 적용 가능한지 파악.
  []
  []
  []
  */
  const listData = ['모각코', '광주3인방', 'lol', 'king'];
  const setterList: Array<SetterOrUpdater<boolean>> = [];
  const [chatRoomCreateFlag, setChatRoomCreateFlag] = useRecoilState(createChatRoomFlag);

  /**
   * id를 받아서 해당 id의 chatroom button component를 반환
   * @param id
   * @returns chatroom button component [wrapper, icon, bar]
   */

  function createMainButton() {

    const [isActive, setIsActive] = useRecoilState(dynamicBtnClass('main'));

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
      <div className='chat-room-wrapper'>
        <Link to='/'>
          <div className={isActive ? 'main-button' : 'main-button button-clicked'} onClick={handleClick}><img src={logo} alt="logo" /></div>
        </Link>
        <div className={isActive ? 'chat-room-bar' : 'chat-room-bar bar-clicked'} />
      </div>
    )
  }

  function creareChatRoomButton(id: string) {

    const [isActive, setIsActive] = useRecoilState(dynamicBtnClass(id));

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
      <div className='chat-room-wrapper'>
        <div className={isActive ? 'chat-room-icon' : 'chat-room-icon button-clicked'} onClick={handleClick}><p>{id}</p></div>
        <div className={isActive ? 'chat-room-bar' : 'chat-room-bar bar-clicked'} />
      </div>
    );
  }

  function createChatRoomBtn() {

    function handleClick() {
      if(chatRoomCreateFlag!==false){
        setChatRoomCreateFlag(false);
      }
    }

    return (
      <div className='chat-room-wrapper'>
        <div className='chat-room-icon' onClick={handleClick} ><img src={plus} alt="logo" /></div>
      </div>
    );
  }

  return (
    <div className='chat-room-side-bar-wrapper'>
      <div className='chat-room-list'>
        {createMainButton()}
        <div className='divder' />
        {listData.map((id) => creareChatRoomButton(id))}
        {createChatRoomBtn()}
      </div>
    </div>
  )
}
