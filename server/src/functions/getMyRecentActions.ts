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


		return (
			result.map(i => i.type === 'sent' && i.toUserId === userId ? ({
				...i,
				gift: i.gift[0],
				type: 'received',
				from: i?.from?.[0]
			}) : ({
				...i,
				gift: i.gift[0],
				to: i?.to?.[0]
			}))
		);

	}
	catch (e) {}

	return []
}

export default getMyRecentActions;