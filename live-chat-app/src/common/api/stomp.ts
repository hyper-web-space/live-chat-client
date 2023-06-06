import session from '../../common/auth/session';
import { Client } from '@stomp/stompjs';

export default class StompClient {
    private static instance: StompClient;
    client: Client;
    token: string | null;
    connectState: boolean;
    subList: string[];

    private constructor() {
        this.client = new Client();
        this.token = null;
        this.subList = [];
        this.connectState = false;
    }

    static getInstance(): StompClient {
        if (!StompClient.instance && session.getToken('accessToken')) {
            StompClient.instance = new StompClient();
            StompClient.instance.initialize();
        }
        return StompClient.instance;
    }

    private initialize() {
        if (this.checkConnection()) {
            return;
        }

        this.token = session.getToken('accessToken');

        this.client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            connectHeaders: {
                'Authorization': `${this.token}`
            },
            debug: function (str: string) {
                console.log(str);
            },
        });

        this.client.onStompError = function (frame) {
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
        };
        this.client.onConnect = function (frame) {
            console.log('****Connected: ' + frame.headers, frame.body, frame.command);
        };

        this.client.activate();
    }

    subscribeChatRoom(roomId: string) {
        if(this.subList.includes(roomId)) {
            return false;
        }else{
            this.client.subscribe(`/chat/${roomId}`, message => {
                console.log(`this is ${roomId}`)
                console.log(`Received: ${message.body}`)
            });
            this.subList.push(roomId);
        }
    }

    publishChatRoom(roomId: string, contents: string, userId: string) {
        const msg = JSON.stringify({
            'sender': userId,
            'contents': contents,
            'messageTimestamp': this.timestamp()
        });

        this.client.publish({
            destination: `/chat/${roomId}`,
            body: msg
        });
    }

    checkConnection() {
        if (this.client.connected) {
            return true;
        } else {
            return false;
        }
    }

    timestamp(): string {
        const today = new Date();
        today.setHours(today.getHours() + 9);
        return today.toISOString().replace('T', ' ').substring(0, 19);
    }
}