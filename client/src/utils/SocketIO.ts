import { Socket, io } from "socket.io-client";
import ServerToClientEvents from "../../../shared/ServerToClientEvents";
import ClientToServerEvents from "../../../shared/ClientToServerEvents";
import SharedSettings from "../../../shared/SharedSettings";
import useLanguage from "../hooks/useLanguage";

const SocketIO: Socket<ServerToClientEvents, ClientToServerEvents> = io((
	SharedSettings.isProduction ? '/' : `:${SharedSettings.API_SERVER_LISTEN_PORT}`
), {
	autoConnect: true,
	path: SharedSettings.SOCKET_IO_PATH,
	auth: {
		initData: Telegram.WebApp.initData,
		language_code: useLanguage.getLang()
	},
});

export default SocketIO;