import { Db } from "mongodb";
import getNonEmptyString from "../../../shared/getNonEmptyString";

const getReceivedGifts = async(database: Db, userId: string) => {


	do try {
		const purchasedAndReceivedGifts = database.collection('purchasedAndReceivedGifts');
		userId = getNonEmptyString(userId);
		if (!userId) break;


		const result = await purchasedAndReceivedGifts.aggregate([

			{
				"$match": {
					"toUserId": userId,
					"status": "received"
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
					as: 'from'
				}
			}

		]).toArray();

		return result.map(item => ({

			...item.gift[0],
			...item,
			from: item?.from?.[0],
			date: item.date

		})) as any;

	} catch (e) {}
	while (0);

	return []
}

export default getReceivedGifts;