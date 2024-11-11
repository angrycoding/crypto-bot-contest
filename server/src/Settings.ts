import FS from 'fs';
import Path from 'path';
import SharedSettings from '../../shared/SharedSettings';

const { isProduction } = SharedSettings;
const X_DIR = Path.resolve(__dirname, '../../certs');


const Settings = {

	// ssl certificates to develop locally
	CERTS: isProduction ? undefined : {
		key: FS.readFileSync(Path.resolve(X_DIR, 'privkey11.pem')),
		cert: FS.readFileSync(Path.resolve(X_DIR, 'fullchain11.pem'))
	},

	// invoice expiration time (sec)
	invoiceExpirationTimeS: 60,

	// registered mini app's url
	MINI_APP_URL: 'https://t.me/giftapp_miniapp_bot/app/',

	// crypto pay api url
	CRYPTO_PAY_API_URL: "https://testnet-pay.crypt.bot/api",

	// crypto pay token
	CRYPTO_PAY_TOKEN: "19408:AAI5Y1UPpy2lwiAPOEvgoVcYts2g53cGmnc",
	
	// telegram bot token
	BOT_TOKEN: "8145731055:AAEzF9T1N-s0oPk_fgEoiFRp3zeBVkMJ5ag",

	// update avatar if it's older than (ms)
	AVATAR_UPDATE_INTERVAL_MS: 1000 * 60 * 60,

	// where to save user's avatars
	AVATAR_SAVE_PATH: (
		isProduction ?
		Path.resolve(__dirname, './static/avatars') :
		Path.resolve(__dirname, '../../client/public/avatars')
	),


	WEBHOOK_SERVER_LISTEN_PORT: 8094,
	BOT_HOOK_URL_SET: "https://giftapp.videotam.ru/webhook/",


	WELCOME_IMAGE_FILE_ID: "AgACAgIAAxkDAAIBq2cvZc-8gxYr0lTFuf2qe9wEJC_5AAIF5zEbQlB5SWvgZOsBWI9OAQADAgADcwADNgQ",
	SEND_GIFT_THUMBNAIL_URL: 'https://play-lh.googleusercontent.com/JFsWuM7yWlTxhoddyAA5eLAaS92hjJz5-hAa-82o8hMr2Kbeg8yDzIounvNSNCTYNg',
	
}

export default Settings;