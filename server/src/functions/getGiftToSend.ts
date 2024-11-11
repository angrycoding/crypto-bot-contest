import { Db } from "mongodb";
import Gift from "../../../shared/Gift";

const getGiftToSend = async(database: Db, purchaseUserId: string, instanceId: string): Promise<Gift | undefined> => {

	if (!purchaseUserId || !instanceId) return;

	const purchasedAndReceivedGifts = database.collection('purchasedAndReceivedGifts');

	const result = (await purchasedAndReceivedGifts.aggregate([{
		$match: {
			userId: purchaseUserId,
			instanceId: instanceId,
			status: 'purchased'
		}
	}, {
		$lookup: {
			from: 'gifts',
			localField: 'giftId',
			foreignField: 'giftId',
			as: 'gift'
		}
	}]).toArray())?.[0];

	const gift = result?.gift?.[0];

	if (!gift) return;


	return {
		...result,
		...gift,
		gift: undefined
	};


}

export default getGiftToSend;