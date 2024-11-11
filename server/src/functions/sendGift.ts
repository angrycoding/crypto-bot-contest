import { Db } from "mongodb";
import Gift from "../../../shared/Gift";

const sendGift = async(database: Db, gift: Gift) => {

	const { giftId, userId, status, instanceId, purchasePrice } = gift;

	if (!userId || !instanceId || status !== 'purchased') return;

	const purchasedAndReceivedGifts = database.collection('purchasedAndReceivedGifts');

	(await purchasedAndReceivedGifts.updateOne({
		userId,
		instanceId,
		status: 'purchased'
	}, {
		$unset: {
			instanceId: ''
		}
	})).modifiedCount;

	return Boolean((await purchasedAndReceivedGifts.insertOne({
		giftId,
		userId,
		status: 'sent',
		purchasePrice,
		instanceId,
		date: Date.now(),
	})).insertedId);

}

export default sendGift;