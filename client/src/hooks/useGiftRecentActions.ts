import { useEffect, useState } from "react";
import SocketIO from "../utils/SocketIO";
import Operation from "../../../shared/Operation";

let cache: {[giftId: string]: Operation[]} = {}

const useGiftRecentActions = (giftId: string | undefined): Operation[] => {


	const [ result, setResult ] = useState<Operation[]>(cache?.[giftId || ''] || []);

	const updateOperations = (giftId: string, operations: Operation[]) => {
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