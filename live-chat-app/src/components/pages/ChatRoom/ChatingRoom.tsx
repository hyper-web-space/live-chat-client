import './ChatingRoom.scss';

import stomp from '../../../common/api/stomp';

const client = stomp.getInstance();

export default function ChatingRoom({ id }: { id: string }) {

	//해당 chatroom id를 받아서 해당 채팅방 데이터 받아옴

	//채팅방 데이터를 받아서 채팅방 화면 구성
	function sendMsg() {
		console.log('sendMsg');
		client.publishChatRoom(id, 'test','hyunbae');
	}


	return (
		<div className="container">
			<div className="chat-box"></div>
			<div className="message-input">
				<input type="text" onClick={sendMsg} placeholder="메시지를 입력하세요" />
				<button>{id}</button>
			</div>
		</div>
	)
}
