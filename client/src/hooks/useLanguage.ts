import { useEffect } from "react";
import useForceUpdate from "./useForceUpdate";
import parseJSON from "../../../shared/parseJSON";
import Messages from '../../../shared/messages';

type Lang = 'en' | 'ru';

const initData = new URLSearchParams(Telegram.WebApp.initData);
const language_code = parseJSON(initData.get('user'))?.language_code;


let currentLang: Lang = (() => {
	const result = localStorage.getItem('selectedLang') || '';
	if (['en', 'ru'].includes(result)) return result as Lang;
	if (['en', 'ru'].includes(language_code)) return language_code as Lang;
	return 'en';
})();


type KEYS = keyof typeof Messages;

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

	for (const k in Messages) {
		// @ts-ignore
		x[k] = Messages[k][currentLang];
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