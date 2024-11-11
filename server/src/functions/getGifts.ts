import { Db } from "mongodb";
import Gift from "../../../shared/Gift";

const getGifts = async(db: Db): Promise<Gift[]> => {
	try {
		const gifts = db.collection('gifts');
		return await gifts.find({}).toArray() as any;
	}
	catch (e) {}
	return [];
}

export default getGifts;