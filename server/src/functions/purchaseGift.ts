import { Db, ObjectId } from "mongodb";
import CryptoBotAPI, { CryptoCurrencyCode } from 'crypto-bot-api'
import getNonEmptyString from "../../../shared/getNonEmptyString";
import Settings from "../Settings";
import { UserDetails } from "../utils/getUserDetails";


const client = new CryptoBotAPI(Settings.CRYPTO_PAY_TOKEN, Settings.CRYPTO_PAY_API_URL);

const createInvoice = async(amount: number, asset: CryptoCurrencyCode): Promise<{
	id: number,
	url: string,
	expire: number
} | void> => {

	try {
		const invoice = await client.createInvoice({
			amount,
			asset,
			expiresIn: Settings.invoiceExpirationTimeS
		});
		

		console.info('will expire at', invoice.expirationDate);

		if (invoice.id && invoice.status === 'active' && invoice.miniAppPayUrl) {
			return {
				id: invoice.id,
				expire: invoice.expirationDate.getTime(),
				url: invoice.miniAppPayUrl
			};
		}

	} catch (e) {
		console.info(e)
	}


}


const purchaseGift = async(db: Db, user: UserDetails, giftId: string): Promise<string> => {


	do try {

		const gifts = db.collection('gifts');
		const invoices = db.collection('invoices');
				
		giftId = getNonEmptyString(giftId);
		if (!giftId) break;

		const gift = await gifts.findOne({
			giftId,
			$where: 'this.purchased < this.total'
		});

		if (!gift) break;

		
		const { price, name } = gift;

		const invoice = await createInvoice(price, gift.currency);
		console.info({invoice})
		if (!invoice) break;


		const foo = await invoices.updateOne({
			userId: user.userId,
			giftId,
		}, {
			$set: {
				purchasePrice: price,
				giftName: name,
				languageCode: user.languageCode,
				invoiceId: invoice.id,
				expire: invoice.expire,
				invoiceUrl: invoice.url
			}
		}, {
			upsert: true
		});



		if (foo.upsertedCount === 1) {
			console.info('REDUCE purchased...');

			const bar = await gifts.updateOne({
				giftId,
				$where: 'this.purchased < this.total'
			}, {
				$inc: {
					purchased: 1
				}
			});


			console.info(bar.modifiedCount);

			if (bar.modifiedCount !== 1) break;
	
		}

		return invoice.url;


	} catch (e) {
		console.info(e)
	}
	
	while (0);
	
	return '';

}

export default purchaseGift;