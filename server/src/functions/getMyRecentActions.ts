import { Db } from "mongodb";
import { UserDetails } from "../utils/getUserDetails";

const getMyRecentActions = async(database: Db, user: UserDetails) => {
	try {

		const { userId } = user;
		const purchasedAndReceivedGifts = database.collection('purchasedAndReceivedGifts');

		const result = await purchasedAndReceivedGifts.aggregate([

			{
				$match: {
					$or: [
						{ userId: userId },
						{ toUserId: userId },
					]
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
					localField: 'toUserId',
					foreignField: 'userId',
					as: 'to'
				}
			},

			{
				$lookup: {
					from: 'users',
					localField: 'userId',
					foreignField: 'userId',
					as: 'from'
				}
			},

			{
				$sort: {
					date: -1
				}
			},

			
		]).toArray();


		return result.map(item => ({
			...item?.gift?.[0],
			
			from: {
				...item?.from?.[0],
				isMe: item?.from?.[0]?.userId === userId
			},

			to: {
				...item?.to?.[0],
				isMe: item?.to?.[0]?.userId === userId
			},

			date: item?.date,
			status: item?.status,
			purchasePrice: item?.purchasePrice
		}));

	}
	catch (e) {}

	return []
}

export default getMyRecentActions;