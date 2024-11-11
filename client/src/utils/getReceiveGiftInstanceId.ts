// @ts-ignore
let receivedGiftInstanceId = Telegram?.WebApp?.initDataUnsafe?.start_param?.trim?.() || '';

if (sessionStorage.getItem('receivedGiftInstanceId') === receivedGiftInstanceId) {
	receivedGiftInstanceId = '';
} else {
	sessionStorage.setItem('receivedGiftInstanceId', receivedGiftInstanceId);
}

const getReceiveGiftInstanceId = (): string => receivedGiftInstanceId

export default getReceiveGiftInstanceId;