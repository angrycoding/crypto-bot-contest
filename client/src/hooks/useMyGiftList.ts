import { useEffect } from "react";
import SocketIO from "../utils/SocketIO";
import useForceUpdate from "./useForceUpdate";
import Gift from "../../../shared/Gift";

let myGifts: Gift[] | undefined = undefined;

const updateMyGifts = (newGiftInstanceId?: string) => {
	SocketIO.emit('getMyGifts', newGifts => {
		myGifts = newGifts;
		document.dispatchEvent(new Event('updateMyGifts'));
		const newGift = newGifts.find(gift => gift.instanceId === newGiftInstanceId);
		if (newGift) {
			document.dispatchEvent(new CustomEvent<Gift>('purchasedGift', { detail: newGift }));
		}
	});
}

SocketIO.on('update', what => {
	for (const update of what) {
		if (update.startsWith('getMyGifts')) {
			updateMyGifts(update.split('/')?.[1]);
			break;
		}
	}
});

updateMyGifts();

const useMyGiftList = (): Gift[] | undefined => {

	const forceUpdate = useForceUpdate();

	useEffect(() => {
		document.addEventListener('updateMyGifts', forceUpdate);
		return () => {
			document.removeEventListener('updateMyGifts', forceUpdate);
		}
	}, []);

	return myGifts;
}


export default useMyGiftList;