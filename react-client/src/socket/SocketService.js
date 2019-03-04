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
    const subject$ = new Subject();
    this.socket.on('message', data => subject$.next(data));
    return subject$;
  }
}

export default new SocketService();
