import * as socketIo from 'socket.io-client';
import { Subject } from 'rxjs';

const SERVER_URL = 'http://localhost:8080';

class SocketService {
  constructor() {
    this.socket = null;
    this.socket = socketIo(SERVER_URL);
  }

  send(message) {
    this.socket.emit('message', message);
  }

  onMessage() {
    // return new Observable<Message>(observer => {
    //     this.socket.on('message', (data: Message) => observer.next(data));
    // });
    const subject$ = new Subject();
    this.socket.on('message', data => subject$.next(data));
    return subject$;
  }

  onEvent(event) {
    // return (
    //   new Observable() <
    //   Event >
    //   (observer => {
    //     this.socket.on(event, () => observer.next());
    //   })
    // );
  }
}

export default new SocketService();
