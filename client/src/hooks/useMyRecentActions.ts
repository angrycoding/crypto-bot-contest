import { useEffect, useState } from "react";
import SocketIO from "../utils/SocketIO";
import RecentAction from "../../../shared/RecentAction";

let cache: RecentAction[] | undefined = undefined;

const useMyRecentActions = (): RecentAction[] | undefined => {


	const [ result, setResult ] = useState<RecentAction[] | undefined>(cache);

	const updateMyRecentActions = (recentActions: RecentAction[]) => {
		cache = recentActions;
		setResult(recentActions);
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

	}, []);


	return result;
}


export default useMyRecentActions;