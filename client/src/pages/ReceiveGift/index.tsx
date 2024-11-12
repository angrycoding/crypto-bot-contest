import { useEffect } from "react";
import SocketIO from "../../utils/SocketIO";
import Gift from "../../../../shared/Gift";
import useForceUpdate from "../../hooks/useForceUpdate";
import ImageScreen from "../../components/ImageScreen";
import useLanguage from "../../hooks/useLanguage";
import BottomButtons from "../../components/BottomButtons";
import BackButton from "../../components/BackButton";
import getReceiveGiftInstanceId from "../../utils/getReceiveGiftInstanceId";
import { useNavigate } from "react-router-dom";

let receivedGift: Gift | undefined | 0 = 0;

const receiveGiftInstanceId = getReceiveGiftInstanceId();

if (receiveGiftInstanceId) {
	SocketIO.emit('receiveGift', receiveGiftInstanceId, (gift) => {
		receivedGift = gift;
		document.dispatchEvent(new Event('receivedGiftStatusUpdate'));
	});
}

const ReceiveGift = () => {

	const messages = useLanguage();
	const forceUpdate = useForceUpdate();
	const navigate = useNavigate();


	useEffect(() => {

		document.addEventListener('receivedGiftStatusUpdate', forceUpdate);
		return () => {
			document.removeEventListener('receivedGiftStatusUpdate', forceUpdate);
		}

	}, []);

	if (receivedGift === 0) return <></>;

	if (!receivedGift) {
		return <>
			<ImageScreen
				title={messages.error}
				subtitle={messages.pleaseTryAgainLater}
			/>
			<BackButton onClick={() => window.location.reload()} />
			<BottomButtons
				primaryButton={messages.openStore}
				onPrimaryButtonClick={() => window.location.reload()}
			/>
		</>
	}


	return <>
		<ImageScreen
			title={messages.giftReceived}
			subtitle={messages.giftReceivedHint(receivedGift.name)}
			image={receivedGift.image}
			toastTitle={messages.giftReceived}
			toastDescr={`${[receivedGift.name, messages.from, receivedGift?.from?.userName].join(' ')}.`}
			toastAction={messages.view}
			onToastAction={() => navigate('/myprofile')}
		/>
		<BackButton onClick={() => window.location.reload()} />
		<BottomButtons
			primaryButton={messages.openProfile}
			onPrimaryButtonClick={() => {
				window.location.pathname = '/myprofile';
			}}
		/>
	</>

}

export default ReceiveGift;