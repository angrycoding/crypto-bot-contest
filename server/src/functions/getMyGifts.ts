import { Db } from "mongodb";
import Gift from "../../../shared/Gift";
import { UserDetails } from "../utils/getUserDetails";

const getMyGifts = async(db: Db, user: UserDetails): Promise<Gift[]> => {

	try {
		const purchasedAndReceivedGifts = db.collection('purchasedAndReceivedGifts');

		const result = await purchasedAndReceivedGifts.aggregate([

			{
				"$match": {
					"userId": user.userId,
					"status": "purchased",
					instanceId: {
						$ne: null
					}
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


		]).toArray();

		return result.map(item => ({
			...item.gift[0],
			...item,
		})) as any;

	} catch (e) {}

	return []

}

export default getMyGifts;