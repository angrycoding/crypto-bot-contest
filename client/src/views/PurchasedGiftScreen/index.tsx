import { useNavigate } from "react-router-dom";
import useLanguage from "../../hooks/useLanguage";
import usePurchasedGift from "../../hooks/usePurchasedGift";
import BackButton from "../../components/BackButton";
import BottomButtons from "../../components/BottomButtons";
import ImageScreen from "../../components/ImageScreen";

const PurchasedGiftScreen = () => {

	const navigate = useNavigate();
	const purchasedGift = usePurchasedGift()
	 || {
		name: 'xxx',
		price: 20,
		currency: 'usdt',
		image: 'x',
		instanceId: 'asdfasdf',
		purchasePrice: 333
	};
	const messages = useLanguage();

	const sendGift = () => {
		usePurchasedGift.clear();	
		navigate(`/gifts/${purchasedGift.instanceId}`)
	}

	if (!purchasedGift) return <></>

	return <>


		<ImageScreen
			title={messages.giftPurchased}
			subtitle={messages.giftPurchasedSubtitle(
				purchasedGift.name,
				[purchasedGift.purchasePrice, purchasedGift.currency.toUpperCase()].join(' ')
			)}
			image={purchasedGift.image}
			toastTitle={messages.youBoughtAGift}
			toastDescr={messages.nowSendItToYourFriend}
			toastAction={messages.send}
			onToastAction={sendGift}
		/>
			
		<BottomButtons
			primaryButton={messages.sendGift}
			onPrimaryButtonClick={sendGift}
			secondaryButton={messages.openStore}
			onSecondaryButtonClick={() => {

				window.location.href = '/';

			}}
		/>

		<BackButton onClick={() => {
			usePurchasedGift.clear();
		}} />


	</>

}

export default PurchasedGiftScreen;