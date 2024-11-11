import { Db } from "mongodb";
import Operation from "../../../shared/Operation";
import { UserDetails } from "../utils/getUserDetails";

const getGiftOperations = async(db: Db, user: UserDetails, giftId: string): Promise<Operation[]> => {
	try {
		const purchasedAndReceivedGifts = db.collection('purchasedAndReceivedGifts');

		
		let result: any = await purchasedAndReceivedGifts.aggregate([

			{
				$match: {
					giftId: giftId,
				}
			},


			{
				$lookup: {
					from: 'users',
					localField: 'userId',
					foreignField: 'userId',
					as: 'user'
				}
			},

			{
				$lookup: {
					from: 'users',
					localField: 'toUserId',
					foreignField: 'userId',
					as: 'toUser'
				}
			},

			{
				$sort: {
					date: -1,
				}
			},

			{
				$limit: 10
			}
			
			
		]).toArray();

		result = result?.map?.(item => ({
			...item,
			toUser: {
				...item?.toUser?.[0],
				isMe: item?.toUser?.[0]?.userId === user.userId
			},
			user: {
				...item?.user?.[0],
				isMe: item?.user?.[0]?.userId === user.userId
			}
		}))

		return result
		
	} catch (e) {}
	return [];
}

export default getGiftOperations;