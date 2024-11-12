import plural from './plural';

const formatDate = (date: number, separator: string): string => {
	const dateObj = new Date(date);
	return `${[
		String(dateObj.getDate()).padStart(2, '0'),
		String(dateObj.getMonth() + 1).padStart(2, '0'),
		dateObj.getFullYear()
	].join('.')} ${separator} ` + [
		String(dateObj.getHours()).padStart(2, '0'),
		String(dateObj.getMinutes()).padStart(2, '0')
	].join(':');
}



const Messages = {

	buy: {
		en: 'Buy',
		ru: 'Покупка'
	},

	sending: {
		en: 'Send',
		ru: 'Отправка'
	},

	leaderBoardTo: {
		en: 'to',
		ru: ''
	},

	leaderBoardFrom: {
		en: 'from',
		ru: 'от'
	},

	receiving: {
		en: 'Receive',
		ru: 'Получено'
	},

	"of": {
		en: 'of',
		ru: 'из'
	},
	"purchaseThisGift": {
		en: 'Purchase this gift for the opportunity to give it to another user.',
		ru: 'Приобретите этот подарок, чтобы иметь возможность подарить его другому пользователю.'
	},
	"buyAndSend": {
		en: 'Buy and Send Gifts',
		ru: 'Покупайте и отправляйте подарки'
	},
	"uniqueGifts": {
		en: 'Unique gifts for everyone by Crypto Pay.',
		ru: 'Уникальные подарки для всех от Crypto Pay.'
	},
	"giftPurchased": {
		en: "Gift Purchased",
		ru: 'Подарок куплен'
	},
	giftPurchasedSubtitle: {
		en: (gift: string, price: string) => `<b>${gift}</b> gift was purchased for <b>${price}</b>.`,
		ru: (gift: string, price: string) => `<b>${gift}</b> был куплен за <b>${price}</b>.`,
	},
	youBoughtAGift: {
		en: 'You Bought a Gift',
		ru: 'Вы купили подарок'
	},
	nowSendItToYourFriend: {
		en: 'Now send it to your friend.',
		ru: 'Отправьте его другу.'
	},
	"recentActions": {
		en: "Recent Actions",
		ru: 'Последние действия'
	},
	"buyGift": {
		en: 'Buy gift',
		ru: 'Покупка подарка'
	},
	you: {
		en: 'You',
		ru: 'Вы'
	},
	boughtGift: {
		en: 'bought a gift',
		ru: 'купил(а) подарок'
	},
	youBoughtGift: {
		en: 'bought a gift',
		ru: 'купили подарок'
	},
	sendGiftAction: {
		en: 'Send gift',
		ru: 'Отправка подарка'
	},
	sentGiftTo: {
		en: 'sent gift to',
		ru: 'отправил подарок'
	},
	youSentGiftTo: {
		en: 'sent gift to',
		ru: 'отправили подарок'
	},
	buyAGift: {
		en: 'Buy a Gift',
		ru: 'Купить Подарок'
	},
	sendGifts: {
		en: "Send Gifts in Telegram",
		ru: 'Отправляйте подарки в Telegram'
	},
	sendGiftsToUsers: {
		en: "Send gifts to users that can be stored in their app profile.",
		ru: 'Отправляйте подарки пользователям, которые можно сохранить в их профиле приложения.'
	},
	formatGifts: {
		en: (gifts: number) => plural(gifts, ['gift', 'gifts', 'gifts']),
		ru: (gifts: number) => plural(gifts, ['подарок', 'подарка', 'подарков'])
	},
	formatGiftsReceived: {
		en: (gifts: number) => plural(gifts, ['gift received', 'gifts received', 'gifts received']),
		ru: (gifts: number) => plural(gifts, ['подарок получен', 'подарка получено', 'подарков получено'])
	},
	giftsReceived: {
		en: 'gifts received',
		ru: 'подарков получено'
	},
	store: {
		en: 'Store',
		ru: 'Магазин'
	},
	gifts: {
		en: 'Gifts',
		ru: 'Подарки'
	},
	leaderboard: {
		en: 'Leaderboard',
		ru: 'Рейтинг'
	},
	myprofile: {
		en: 'Profile',
		ru: 'Профиль'
	},
	hereIsYourActionHistory: {
		en: 'Here is your action history.',
		ru: 'Вот ваши последние действия.'
	},
	youDontHaveGiftsYet: {
		en: "You don't have any gifts yet.",
		ru: "У вас пока нет подарков."
	},
	heDoesntHaveGiftsYet: {
		en: "This user doesn't have any gifts yet.",
		ru: 'У этого пользователя пока нет подарков.',
	},
	openStore: {
		en: 'Open Store',
		ru: 'Перейти в магазин'
	},
	historyIsEmpty: {
		en: 'History is Empty',
		ru: 'История пуста'
	},
	historyIsEmptyHint: {
		en: `Give and receive gifts so there's something here.`,
		ru: 'Дарите и получайте подарки, чтобы здесь что-то появилось.'
	},
	send: {
		en: 'Send',
		ru: 'Отправить'
	},
	sendGift: {
		en: 'Send Gift',
		ru: 'Отправить подарок'
	},
	gift: {
		en: 'Gift',
		ru: 'Подарок'
	},
	date: {
		en: 'Date',
		ru: 'Дата'
	},
	price: {
		en: 'Price',
		ru: 'Цена'
	},
	ratingIsEmpty: {
		en: 'Nothing here yet.',
		ru: 'Тут пока-что ничего нет.'
	},
	noResults: {
		en: 'We have no results matching your query, please type something else or try again later.',
		ru: 'Ничего не найдено по вашему запросу, уточните свой запрос или попробуйте позже.'
	},
	availability: {
		en: 'Availability',
		ru: 'Доступно'
	},

	formatDate: {
		en: (date: number) => formatDate(date, 'at'),
		ru: (date: number) => formatDate(date, 'в'),
	},

	sendGiftToContact: {
		en: "Send Gift to Contact",
		ru: 'Отправить подарок контакту'
	},
	search: {
		en: 'Search',
		ru: 'Поиск'
	},
	view: {
		en: 'View',
		ru: 'Посмотреть'
	},
	from: {
		en: 'from',
		ru: 'от'
	},
	error: {
		en: 'Ooops, we have an error!',
		ru: 'Ууупс, что-то пошло не так!'
	},
	pleaseTryAgainLater: {
		en: 'Please try again in a few minutes.',
		ru: 'Пожалуйста попробуйте еще раз через несколько минут.'
	},
	giftReceived: {
		en: 'Gift Received',
		ru: 'Подарок получен'
	},
	giftReceivedHint: {
		en: (gift: string) => `You have received the gift <b>${gift}</b>`,
		ru: (gift: string) => `Вы получили подарок <b>${gift}</b>`
	},
	openProfile: {
		en: 'Open Profile',
		ru: 'Открыть профиль'
	},

	close: {
		en: 'Close',
		ru: 'Закрыть'
	},

	soldout: {
		en: 'Soldout',
		ru: 'Продано'
	}
,

	hereYouCanBuyAndSend: {
		en: '🎁 Here you can buy and send gifts to your friends.',
		ru: '🎁 Здесь вы можете купить и отправить подарки своим друзьям.'
	},

	openApp: {
		en: 'Open App',
		ru: 'Открыть приложение'
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