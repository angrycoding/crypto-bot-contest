import { useEffect } from "react";
import useForceUpdate from "./useForceUpdate";
import parseJSON from "../../../shared/parseJSON";

type Lang = 'en' | 'ru';

const initData = new URLSearchParams(Telegram.WebApp.initData);
const language_code = parseJSON(initData.get('user'))?.language_code;


let currentLang: Lang = (() => {
	const result = localStorage.getItem('selectedLang') || '';
	if (['en', 'ru'].includes(result)) return result as Lang;
	if (['en', 'ru'].includes(language_code)) return language_code as Lang;
	return 'en';
})();

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




const translations = {
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
	oneGift: {
		en: 'gift',
		ru: 'подарок'
	},
	manyGifts: {
		en: 'gifts',
		ru: 'подарков'
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

}

type KEYS = keyof typeof translations;

const useLanguageBase = (): {
	[k in KEYS]: any
} & {
	currentLang: string,
	setLang: (v: string) => void
} => {

	const forceUpdate = useForceUpdate();

	useEffect(() => {

		document.addEventListener('langswitch', forceUpdate);

		return () => {
			document.removeEventListener('langswitch', forceUpdate);
		}

	}, []);


	let x: any= {};

	for (const k in translations) {
		// @ts-ignore
		x[k] = translations[k][currentLang];
	}

	return {
		...x,
		currentLang,
		setLang: (lang: string) => {
			// @ts-ignore
			currentLang = lang;
			localStorage.setItem('selectedLang', currentLang);
			document.dispatchEvent(new Event('langswitch'))
	}
	}
}

const useLanguage = Object.assign(useLanguageBase, {

	getLang: () => {
		return currentLang;
	},

	setLang: (lang: string) => {
			// @ts-ignore
			currentLang = lang;
			document.dispatchEvent(new Event('langswitch'))
	}
})

export default useLanguage;