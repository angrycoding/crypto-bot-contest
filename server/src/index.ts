import FS from 'fs';
import HTTP from 'http';
import HTTPS from 'https';
import Path from 'path';
import { Server } from 'socket.io';
import ServerToClientEvents from '../../shared/ServerToClientEvents';
import ClientToServerEvents from '../../shared/ClientToServerEvents';
import { Db, MongoClient } from "mongodb";
import startWebhookServer from './webhookServer';
import receiveGift from './functions/receiveGift';
import getGiftOperations from './functions/getGiftOperations';
import getMyGifts from './functions/getMyGifts';
import getUserDetails, { UserDetails } from './utils/getUserDetails';
import Settings from './Settings';
import sendTgRequest from './utils/sendTgRequest';
import closeSocket from './utils/closeSocket';
import Messages from '../../shared/messages';
import getNonEmptyString from '../../shared/getNonEmptyString';
import removeExpiredInvoicesJob from './functions/removeExpiredInvoicesJob';
import syncUser from './functions/syncUser';
import getGifts from './functions/getGifts';
import purchaseGift from './functions/purchaseGift';
import getReceivedGifts from './functions/getReceivedGifts';
import getMyRecentActions from './functions/getMyRecentActions';
import SharedSettings from '../../shared/SharedSettings';

const uri = "mongodb://localhost";

const mongdbClient = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
});



const server = (
	Settings.CERTS ? 
	HTTPS.createServer(Settings.CERTS) :
	HTTP.createServer()
);

const socketIO = new Server<ClientToServerEvents, ServerToClientEvents, {}, UserDetails>(server, {
	path: SharedSettings.SOCKET_IO_PATH,
	cors: {
		origin: "*",
		methods: ["GET", "POST"]
	}
});





(async() => {


	console.info(0, await sendTgRequest('deleteWebhook'))

	console.info(1, await sendTgRequest('setWebhook', {
		'url': Settings.BOT_HOOK_URL_SET
	}))

	await mongdbClient.connect();
	const database = mongdbClient.db('giftapp');
	const users = database.collection('users');


	removeExpiredInvoicesJob(database, () => {
		// update list of gifts (counters) when expired invoice was removed
		socketIO.emit('update', ['getGifts']);
	});

	const sendText = startWebhookServer(database, async(
		userId: string,
		giftId: string,
		giftInstanceId: string
	) => {

		// triggered when user successfully purchased a gift

		for (const socket of await socketIO.fetchSockets()) {

			socket.emit('update', socket.data.userId === userId ? [
				`getMyGifts/${giftInstanceId}`,
				'getMyRecentActions',
				`getGiftOperations/${giftId}`,
				`purchaseSuccess/${giftInstanceId}`
			] : [
				`getGiftOperations/${giftId}`
			])

		}
		

	});


	socketIO.use(async(socket, next) => {

		let user = getUserDetails(socket?.handshake?.auth);
		
		if (!user &&
			!SharedSettings.isProduction &&
			SharedSettings.testUserId &&
			SharedSettings.testUserName) {
			user = {
				userId: SharedSettings.testUserId,
				userName: SharedSettings.testUserName,
				languageCode: 'en'
			}
		}

		if (user && await syncUser(database, user)) {
			socket.data = user;
			next();
		}
		
		else {
			console.info('NO_AUTH')
			closeSocket(socket);
		}
		
	});

	socketIO.on('connection', async(socket) => {


		const currentUser = socket.data;
		const { userId, languageCode, userName } = currentUser;


		socket.on('getGifts', (ret) => getGifts(database).then(ret));
		socket.on('getMyGifts', (ret) => getMyGifts(database, currentUser).then(ret));
		socket.on('getMyRecentActions', (ret) => getMyRecentActions(database, currentUser).then(ret));
		socket.on('getGiftOperations', (giftId, ret) => getGiftOperations(database, currentUser, giftId).then(ret));




		socket.on('getUserProfile', async(uid, ret) => {

			uid = uid === 'me' ? userId : uid;

			const user = await users.findOne({
				userId: uid
			});

			const receivedGifts = await getReceivedGifts(database, uid);

			const rating = (await users.aggregate([
				{
					$sort: {
						giftsReceived: -1,
					}
				}
			]).toArray())?.findIndex?.(x => x?.userId === uid);

			ret({
				userId: uid,
				raiting: rating ? rating + 1 : 0,
				giftsReceived: user?.giftsReceived || [],
				userName: user?.userName,
				receivedGifts
			});
		})



		socket.on('purchaseGift', async(giftId, ret) => {
			const result = await purchaseGift(database, currentUser, giftId);
			console.info('x', result);
			if (result) socketIO.emit('update', ['getGifts']);
			ret(result);
		});



		socket.on('receiveGift', async(instanceId, ret) => {
	
			const receiveInfo = await receiveGift(database, instanceId, currentUser);
			if (!receiveInfo) return ret(undefined);


			const { gift, ownerUserId, ownerUserName } = receiveInfo;

			// send message to the user who SENT THE GIFT
			console.info(1, await sendText(ownerUserId, Messages.receivedYourGift[languageCode](userName, gift.name)));


			// send message to the user who is receiving the gift
			console.info(2, await sendText(userId, Messages.youReceivedGift[languageCode](ownerUserName, gift.name)));

			const allUsers = [
				`getReceivedGifts/${userId}`,
				`getGiftOperations/${gift.giftId}`,
			]

			for (const socket of await socketIO.fetchSockets()) {

				if (socket.data.userId === ownerUserId) {
					socket.emit('update', [
						...allUsers,
						'getMyGifts',
						'getMyRecentActions'
					]);
				}

				else if (socket.data.userId === userId) {
					socket.emit('update', [
						...allUsers,
						'getMyRecentActions',
					]);
				}

				else {
					socket.emit('update', [
						...allUsers,
					]);
				}

			}





			return ret({
				...gift,
				from: {
					userId: ownerUserId,
					userName: ownerUserName
				}
			});
		});






		socket.on('getLeaderBoard', async(ret) => {
			const result = await users.aggregate([
				

				{
					$sort: {
						giftsReceived: -1,
					}
				}

			]).toArray();



			ret(result as any);
		});



	});

	server.listen(SharedSettings.API_SERVER_LISTEN_PORT);
})();

