const Messages = {
	hereYouCanBuyAndSend: {
		en: '🎁 Here you can buy and send gifts to your friends.',
		ru: '🎁 Здесь вы можете купить и отправить подарки своим друзьям.'
	},
	openApp: {
		en: 'Open App',
		ru: 'Открыть приложение'
	},
	sendGift: {
		en: 'Send Gift',
		ru: 'Отправить подарок'
	},
	sendGiftOf: {
		en: 'Send a gift of',
		ru: 'Отправить подарок'
	},
	receiveGift: {
		en: 'Receive Gift',
		ru: 'Получить подарок'
	},
	iHaveGiftForYou: {
		en:  `
			I have a <b>gift</b> for you!
			Tap the button below to open it.
		`,
		ru: `
			У меня есть <b>подарок</b> для тебя!
			Нажми на кнопку ниже, чтобы открыть его.
		`
	},
	receivedYourGift: {
		en: (name: string, gift: string) => `👌 <b>${name}</b> received your gift of <b>${gift}</b>.`,
		ru: (name: string, gift: string) => `👌 <b>${name}</b> получил(а) твой подарок: <b>${gift}</b>.`
	},
	youHavePurchasedGift: {
		en: (gift: string) => `✅ You have purchased the gift of <b>${gift}</b>.`,
		ru: (gift: string) => `✅ Вы приобрели подарок: <b>${gift}</b>.`,
	},
	youReceivedGift: {
		en: (name: string, gift: string) => `⚡ You have received the gift of <b>${gift}</b> from <b>${name}</b>.`,
		ru: (name: string, gift: string) => `⚡ Вы получили подарок <b>${gift}</b> от <b>${name}</b>.`,
	}
}

export default Messages;