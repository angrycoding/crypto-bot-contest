import { useEffect, useState } from "react";
import SocketIO from "../utils/SocketIO";
import Gift from "../../../shared/Gift";

let cache: {[giftId: string]: Gift[]} = {}

const useGiftRecentActions = (giftId: string | undefined): Gift[] => {


	const [ result, setResult ] = useState<Gift[]>(cache?.[giftId || ''] || []);

	const updateOperations = (giftId: string, operations: Gift[]) => {
		cache[giftId] = operations;
		setResult(operations);
	}
	
	const updateHappened = (what: string[]) => {
		if (giftId && what.includes(`getGiftOperations/${giftId}`)) {
			SocketIO.emit('getGiftOperations', giftId, operations => updateOperations(giftId, operations));
		}
	}

	useEffect(() => {

		if (giftId) {
			SocketIO.emit('getGiftOperations', giftId, operations => updateOperations(giftId, operations));
		}

		SocketIO.on('update', updateHappened);

		return () => {
			SocketIO.off('update', updateHappened);
		}
		


	}, [giftId]);


	return result;


}


export default useGiftRecentActions;