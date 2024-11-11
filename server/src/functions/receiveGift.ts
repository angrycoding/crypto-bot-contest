import { Db } from "mongodb";
import Gift from "../../../shared/Gift";
import getNonEmptyString from "../../../shared/getNonEmptyString";
import { UserDetails } from "../utils/getUserDetails";

const receiveGift = async(database: Db, instanceId: string, user: UserDetails): Promise<{
	gift: Gift,
	ownerUserId: string,
	ownerUserName: string
} | undefined> => {

	do try {

		instanceId = getNonEmptyString(instanceId);
		if (!instanceId) break;

		const users = database.collection('users');
		const purchasedAndReceivedGifts = database.collection('purchasedAndReceivedGifts');
		const purchase = (await purchasedAndReceivedGifts.aggregate([

			{
				$match: {
					instanceId,
					status: 'purchased'
				}
			},
			
			{
				$lookup: {
					from: 'gifts',
					localField: 'giftId',
					foreignField: 'giftId',
					as: 'gift'
				}
		
			},
			
			{
				$lookup: {
					from: 'users',
					localField: 'userId',
					foreignField: 'userId',
					as: 'user'
				}
			}

		]).toArray())?.[0];

		if (!purchase) break;

		const ownerUserName = getNonEmptyString(purchase?.user?.[0]?.userName);
		if (!ownerUserName) break;

		const ownerUserId = getNonEmptyString(purchase?.user?.[0]?.userId);
		if (!ownerUserId) break;


		console.info(
		
			'mmmm',
			await purchasedAndReceivedGifts.updateOne({
				instanceId,
				status: 'purchased'
			}, {
				$unset: {
					instanceId: ''
				}
			})
		);


		const success = Boolean((await purchasedAndReceivedGifts.insertOne({
			giftId: purchase.giftId,
			userId: ownerUserId,
			toUserId: user.userId,
			purchasePrice: purchase.purchasePrice,
			date: Date.now(),
			status: 'received'
		})).insertedId)



		console.info(
			'aaaa',
			await users.updateOne({
				userId: user.userId
			}, {
				$inc: {
					giftsReceived: 1
				}
			})
		)


		console.info({ success });

		return {
			gift: purchase?.gift?.[0],
			ownerUserId,
			ownerUserName
		};





	}

	catch (e) {}
	while (0);


	






}

export default receiveGift;