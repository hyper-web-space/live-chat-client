import axios, { AxiosInstance }  from 'axios';

const instance:AxiosInstance = axios.create({
    //baseURL : 'http://localhost:8000'
    baseURL : '/api'
})

<<<<<<< Updated upstream
export default instance;
=======
import { passWordInput, ChatRoom } from '../../states/chatRoomState'
import { SetterOrUpdater, useRecoilState } from 'recoil';


export default class AxiosClient {

    private static classInstance: AxiosClient;
    instance: AxiosInstance = axios.create({
        baseURL: '/api'
    });

    constructor() {
        if (!AxiosClient.classInstance) {
            console.log('create AxiosClient');
            AxiosClient.classInstance = this;
        }
        return AxiosClient.classInstance;
    }

    async joinChatRoom(event: React.MouseEvent<HTMLDivElement, MouseEvent>, chatRoomId: string, user_id: string) {

        const token = auth.getToken('accessToken');
        const passWordInputState = useRecoilState(passWordInput);

        try {
            await this.instance.post(requests.chatRooms + `/${chatRoomId}`,
                {
                    password: passWordInputState
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

    /*
    로그인
    */
    async logIn(event: React.FormEvent<HTMLFormElement>, id: string, pw: string, setWelcomFlag: SetterOrUpdater<boolean>) {
        //로그인 정보 제출

        try {
            const res = await this.instance.post(requests.postLogin, {
                userId: id,
                password: pw,
            });
            console.log(id, pw);
            console.log(res.data);
            //발급된 JWT는 클라이언트 측에서 저장 - 세션 스토리지
            auth.setToken('accessToken', res.data.accessToken);
            auth.setToken('refreshToken', res.data.refreshToken);
            setWelcomFlag(true);
        } catch (error) {
            return error;
        }
    }
    /*
    회원가입
    */
    async signUp(id: string, pw: string, setLoginFlag: SetterOrUpdater<boolean>) {
        try {
            console.log(id, pw);
            await this.instance.post(requests.postSignUp, {
                userId: id,
                password: pw,
            })
            setLoginFlag(true);
            alert('회원가입이 완료되었습니다.');
        } catch (error) {
            console.log(error);
            alert('later make yeajung');
        }
    }

    /*
    전체 채팅방 정보 조회
    */
    async getChatList(offset: number, limit: number) {

        const token = auth.getToken('accessToken');
        //const setChatRoomList = useSetRecoilState(chatRoomList);

        if (!auth.checkToken('accessToken')) {
            return;
        }
        try {
            const res = await this.instance.get(requests.chatRooms,
                {
                    params: {
                        offset: offset,
                        limit: limit
                    },
                    headers: { 'AUTHORIZATION': `Bearer ${token}` }
                }
            );
            //setChatRoomList(res.data.chatRooms);
            const chatRooms: ChatRoom[] = res.data.chatRooms;
            return chatRooms;
        } catch (error) {
            console.log(error);
        }
    }

    async getMyChatRooms(user_id: string, offset: number, limit: number) {
        const token = auth.getToken('accessToken');
        try {
            const res = await this.instance.get(requests.getChatList,
                {
                    params: {
                        offset: offset,
                        limit: limit,
                        user_id: user_id,
                    },
                    headers: { 'AUTHORIZATION': `Bearer ${token}` }
                });
            return res.data.chatRooms;
        } catch (error) {
            alert(error);
        }
        return [];
    }

    async createChatRoom(chatRoomName: string, chatRoomPassWord: string, user_id: string) {
        const password = (chatRoomPassWord === '')? null : chatRoomPassWord;
        const token = auth.getToken('accessToken');
        try {
            await this.instance.post(requests.chatRooms,
                {
                    name: chatRoomName,
                    password: password,
                }, {
                headers: {
                    'AUTHORIZATION': `Bearer ${token}`
                    , user_id: user_id
                }
            });
        } catch (error) {
            alert(error);
        }
    }


}
>>>>>>> Stashed changes
