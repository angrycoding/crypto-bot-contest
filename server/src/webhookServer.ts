import HTTP from 'http';
import { Db, ObjectId } from 'mongodb';
import sendTgRequest from './utils/sendTgRequest';
import getNonEmptyString from '../../shared/getNonEmptyString';
import parseJSON from '../../shared/parseJSON';
import getGiftToSend from './functions/getGiftToSend';
import Settings from './Settings';
import Messages from '../../shared/messages';
import { createHash, createHmac } from 'crypto';

const cleanupText = (text: string): string => {
	text = text.trim();
	text = text.replace(/[\n\t]+/g, ' ');
	text = text.replace(/[\n\t\s]*(<br\s*\/>|<br>)[\n\t\s]*/g, '\n');
	return text;
}

const sendMessage = (userId: string, text: string) => {
	return sendTgRequest('sendMessage', {
		'chat_id': userId,
		'text': cleanupText(text),
		'parse_mode': 'HTML'
	});
}


const startWebhookServer = (database: Db, onPurchase: (
	userId: string,
	giftId: string,
	giftInstanceId: string
) => void) => {

	const server = HTTP.createServer((request, response) => {
		
		let body: any = '';
		
		request.on('data', (chunk) => body += chunk.toString());
		
		request.on('end', async() => {
			response.end();

			body = parseJSON(body);

			console.info(
				JSON.stringify(body, null, '\t')
			)


			if (body?.update_id && body?.update_type && body?.request_date && body?.payload) {
				do {
					const invoiceId = body?.payload?.invoice_id;
					if (!Number.isInteger(invoiceId) || invoiceId <= 0) break;
					if (body?.payload?.status !== 'paid') break;
					const cryptoPayApiSignature = getNonEmptyString(request.headers['crypto-pay-api-signature']);
					if (!cryptoPayApiSignature) break;
					const secret = createHash('sha256').update(Settings.CRYPTO_PAY_TOKEN).digest();
					const checkString = JSON.stringify(body)
					const hmac = createHmac('sha256', secret).update(checkString).digest('hex')
					if (hmac !== cryptoPayApiSignature) break;

					const invoices = database.collection('invoices');
					const purchasedAndReceivedGifts = database.collection('purchasedAndReceivedGifts');

					const invoice = await invoices.findOneAndDelete({
						invoiceId
					});


					if (!invoice) {
						console.info('NOT FOUND INVOICE');
						break;
					}

				
					const { userId, giftId, purchasePrice, giftName, languageCode } = invoice;
				
					const instanceId = new ObjectId().toString();

					await purchasedAndReceivedGifts.insertOne({
						giftId,
						userId,
						date: Date.now(),
						status: 'purchased',
						purchasePrice,
						instanceId
					});

					onPurchase(userId, giftId, instanceId);



					sendMessage(
						userId,
						Messages.youHavePurchasedGift[
							languageCode
						](
							giftName
						)
					);


				} while (0);

				return;
			}





			const text = getNonEmptyString(body?.message?.text);
			const fromId = getNonEmptyString(body?.message?.from?.id + '');
			const inlineQueryId = getNonEmptyString(body?.inline_query?.id);
			const giftInstanceId = getNonEmptyString(body?.inline_query?.query);
			const fromUserId = getNonEmptyString(body?.inline_query?.from?.id + '');


			const languageCode = (() => {
				let language_code = '';
				JSON.stringify(body, (key, value) => {
					if (!language_code && key === 'language_code') language_code = value;
					return (language_code ? 0 : value);
				});
				if (['en', 'ru'].includes(language_code)) return language_code;
				return 'en';
			})();

			if (inlineQueryId && giftInstanceId && fromUserId) {


				const [ languageCode, instanceId ] = giftInstanceId.split('-');


				console.info(languageCode, instanceId);

				
				const gift = await getGiftToSend(database, fromUserId, instanceId);
				if (!gift) return;

				console.info(gift);


				await sendTgRequest('answerInlineQuery', {
					inline_query_id: inlineQueryId,
					cache_time: 1,
					is_personal: false,
					results: [{
						type: 'article',
						id: Math.random() + '',
						title: Messages.sendGift[languageCode],
						description: `${Messages.sendGiftOf[languageCode]} ${gift.name}.`,
						thumbnail_url: Settings.SEND_GIFT_THUMBNAIL_URL,
						reply_markup: {
							inline_keyboard: [
								[{
									text: Messages.receiveGift[languageCode],
									url: `${Settings.MINI_APP_URL}?startapp=${instanceId}`
								}]
							]
						},
						input_message_content: {
							parse_mode: 'HTML',
							message_text: cleanupText(Messages.iHaveGiftForYou[languageCode])
						}
					}]
				});



			}

			else if (fromId && text) {

				let formData = new FormData();
				formData.append('chat_id', fromId);
				formData.append('photo', Settings.WELCOME_IMAGE_FILE_ID);
				formData.append('caption', Messages.hereYouCanBuyAndSend[languageCode]);
				formData.append('reply_markup', JSON.stringify({
					inline_keyboard: [
						[{
							text: Messages.openApp[languageCode],
							url: Settings.MINI_APP_URL
						}]
					]
				}));

				const x = await fetch(`https://api.telegram.org/bot${Settings.BOT_TOKEN}/sendPhoto`, {
					method: 'POST',
					body: formData
				})

				console.info(x);
				console.info( JSON.stringify (
					await x.json(),
					null,
					'\t'
				))
			}
		})
	
	});


	server.listen(Settings.WEBHOOK_SERVER_LISTEN_PORT);


	return sendMessage

}


export default startWebhookServer;