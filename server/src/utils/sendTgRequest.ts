import Settings from '../Settings';

const sendTgRequest = async(method: string, body?: any): Promise<any> => {

	try {

		let result: any = await fetch(`https://api.telegram.org/bot${Settings.BOT_TOKEN}/${method}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: body ? JSON.stringify(body) : undefined
		});

		return await result.json() as any;

	} catch (e) {}

}

export default sendTgRequest;