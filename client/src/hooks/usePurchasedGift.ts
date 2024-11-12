import { useEffect } from "react";
import Gift from "../../../shared/Gift";
import useForceUpdate from "./useForceUpdate";

let purchasedGift: Gift | undefined = undefined;

const usePurchasedGift = (): Gift | undefined => {

	const forceUpdate = useForceUpdate();

	const onPurchasedGift = (event: Event) => {
		const x = (event as CustomEvent<Gift>).detail;
		if (x) {
			purchasedGift = x;
			forceUpdate();
		}
	}

	useEffect(() => {
		document.addEventListener('purchasedGift', onPurchasedGift);
		document.addEventListener('purchasedGiftUpdate', forceUpdate);
		return () => {
			document.removeEventListener('purchasedGift', onPurchasedGift);
			document.removeEventListener('purchasedGiftUpdate', forceUpdate);
		}
	}, []);

	return purchasedGift;

}

usePurchasedGift.clear = () => {
	purchasedGift = undefined;
	document.dispatchEvent(new Event('purchasedGiftUpdate'));
}

export default usePurchasedGift;