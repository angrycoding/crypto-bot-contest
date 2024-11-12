import { Db } from "mongodb";
import { UserDetails } from "../utils/getUserDetails";
import Gift from "../../../shared/Gift";

const getGiftOperations = async(db: Db, user: UserDetails, giftId: string): Promise<Gift[]> => {
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
			to: {
				...item?.toUser?.[0],
				isMe: item?.toUser?.[0]?.userId === user.userId
			},
			from: {
				...item?.user?.[0],
				isMe: item?.user?.[0]?.userId === user.userId
			}
		}))

		return result
		
	} catch (e) {}
	return [];
}

export default getGiftOperations;