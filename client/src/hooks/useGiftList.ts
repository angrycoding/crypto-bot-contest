import { useEffect } from "react";
import SocketIO from "../utils/SocketIO";
import Gift from "../../../shared/Gift";
import useForceUpdate from "./useForceUpdate";


let gifts: Gift[] | undefined = undefined;

const updateGifts = () => {
	SocketIO.emit('getGifts', newGifts => {
		gifts = newGifts;
		document.dispatchEvent(new Event('updateGifts'));
	});
}

SocketIO.on('update', what => {
	if (what.includes('getGifts')) {
		updateGifts();
	}
});

updateGifts();

const useGiftList = (): Gift[] | undefined => {

	const forceUpdate = useForceUpdate();

	useEffect(() => {
		document.addEventListener('updateGifts', forceUpdate);
		return () => {
			document.removeEventListener('updateGifts', forceUpdate);
		}
	}, []);

	return gifts;

}


export default useGiftList;