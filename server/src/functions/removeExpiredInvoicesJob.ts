import { Db } from "mongodb";

const removeExpiredInvoicesJob = async(db: Db, onUpdate: () => void) => {


	const gifts = db.collection('gifts');
	const invoices = db.collection('invoices');

	const expiredInvoices = await invoices.find({
		expire: {
			$lt: Date.now()
		}
	}).toArray();

	console.info({ expiredInvoices })

	for (const invoice of expiredInvoices) {

		const { _id, giftId } = invoice;

		console.info('expired invoice, trying to do purchased--')
		if ((await gifts.updateOne({
			giftId,
			$where: 'this.purchased > 0'
		}, {
			$inc: {
				purchased: -1
			}
		})).modifiedCount === 1) {

			console.info('successfuly reduced...');

			console.info('rem', await invoices.deleteOne({ _id }) );

			onUpdate();

		} else {
			console.info('couldnt do purchased-- :(')
		}

	}


	setTimeout(removeExpiredInvoicesJob, 5000, db, onUpdate);

}

export default removeExpiredInvoicesJob;