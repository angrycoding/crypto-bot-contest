import Crypto from 'crypto';
import parseJSON from '../../../shared/parseJSON';
import getNonEmptyString from '../../../shared/getNonEmptyString';
import Settings from '../Settings';


export type UserDetails = {
	userId: string,
	userName: string,
	languageCode: string,
};


const getUserDetails = (auth: any): UserDetails | null => {

	do try {

		let initData: any = getNonEmptyString(auth?.initData);
		const languageCode = getNonEmptyString(auth?.language_code);

		if (!initData || !languageCode) break;
		initData = new URLSearchParams(initData);

		const user = parseJSON(initData.get('user'));

		const userId = getNonEmptyString(user?.id + '');

		const userName = [
			getNonEmptyString(user?.first_name),
			getNonEmptyString(user?.last_name),
		].filter(Boolean).join(' ') || getNonEmptyString(user?.username);

		if (!userId || !userName) break;

		initData.sort();

		const hash = initData.get("hash");
		initData.delete("hash");

		const dataToCheck = [...initData.entries()].map( ( [key, value] ) => key + "=" + value ).join( "\n" );
		const secretKey = Crypto.createHmac( "sha256", "WebAppData" ).update(Settings.BOT_TOKEN).digest();

		if (Crypto.createHmac( "sha256", secretKey ).update( dataToCheck ).digest( "hex" ) === hash) {
			return {
				userId,
				userName,
				languageCode
			};
		}
	} catch (e) {} while (0);
}

export default getUserDetails;