import { useEffect, useState } from "react";
import SocketIO from "../utils/SocketIO";
import useLanguage from "./useLanguage";
import {format} from "date-fns/format";
import { ru } from "date-fns/locale/ru";
import { enUS } from "date-fns/locale/en-US";
import Gift from "../../../shared/Gift";

type RecentActionMap = {[date: string]: Gift[]} | undefined;

let cache: RecentActionMap = undefined;


const arrayGroup = (array: any[], filter: (value: any) => string) => {

	const result: {[key: string]: any[]} = {};

	for (let c = 0; c < array.length; c++) {
		
		
		const res = filter(array[c]);

		if (!result.hasOwnProperty(res)) {
			result[res] = [];
		}

		result[res].push(
			array[c]
		)


	}

	return result;

}


const useMyRecentActions = (): RecentActionMap => {

	const currentLang = useLanguage.getLang();
	const [ result, setResult ] = useState<RecentActionMap>(cache);

	const updateMyRecentActions = (recentActions: Gift[]) => {
		setResult(cache = arrayGroup(recentActions, ((action: Gift) => {
			const dateObj = new Date(action.date || 0);
			return format (dateObj, "dd MMMM", { locale: currentLang === 'ru' ? ru : enUS })
		})));
	}
	
	const updateHappened = (what: string[]) => {
		if (what.includes('getMyRecentActions')) {
			SocketIO.emit('getMyRecentActions', updateMyRecentActions);
		}
	}

	useEffect(() => {

		SocketIO.emit('getMyRecentActions', updateMyRecentActions);
		SocketIO.on('update', updateHappened);

		return () => {
			SocketIO.off('update', updateHappened);
		}

	}, [currentLang]);


	return result;
}


export default useMyRecentActions;