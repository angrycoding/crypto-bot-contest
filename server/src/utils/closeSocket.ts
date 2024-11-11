import { Socket } from "socket.io";

const closeSocket = (socket: Socket) => {
	delete socket.data;
	socket.removeAllListeners();
	socket.disconnect();
}

export default closeSocket;