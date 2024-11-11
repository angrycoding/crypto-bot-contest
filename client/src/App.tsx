import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Store from './views/Store';
import MyGifts from './views/MyGifts';
import MyProfile from './views/MyProfile';
import TabBar from './components/TabBar';
import useLanguage from './hooks/useLanguage';
import LeaderBoard from './views/LeaderBoard';
import ReceiveGift from './views/ReceiveGift';
import BackButton from './components/BackButton';
import ImageScreen from './components/ImageScreen';
import ProfileScreen from './components/ProfileScreen';
import BottomButtons from './components/BottomButtons';
import usePurchasedGift from './hooks/usePurchasedGift';
import getReceiveGiftInstanceId from './utils/getReceiveGiftInstanceId';
import PurchasedGiftScreen from './views/PurchasedGiftScreen';


export default () => {

	const messages = useLanguage();
	const navigate = useNavigate();
	const purchasedGift = usePurchasedGift();
	const receiveGiftInstanceId = getReceiveGiftInstanceId();

	const location = useLocation();


	return <>

		{location.pathname !== '/' && (
			<BackButton onClick={() => window.history.back()} />
		)}
		
		<div style={{display: (purchasedGift || receiveGiftInstanceId) ? 'none' : 'block'}}>
			<Routes>
				<Route path='/:giftId?' element={<Store />} />
				<Route path='/gifts/:instanceId?' element={<MyGifts />} />


				<Route path='/users/:userId' element={<ProfileScreen value={undefined} />} />
				<Route path='/myprofile' element={<MyProfile />} />
				<Route path='/leaderboard' element={<LeaderBoard />} />
				<Route path='/myprofile' element={<MyProfile />} />

			</Routes>

			<TabBar value={
				window.location.pathname.startsWith('/gifts') ? 'gifts' :
				window.location.pathname.startsWith('/leaderboard') ? 'leaderboard' :
				window.location.pathname.startsWith('/myprofile') ? 'myprofile' :
				'store'
			} onChange={x => navigate(x === 'store' ? '/' : `/${x}`)} />


		</div>

		{receiveGiftInstanceId && <>
			<ReceiveGift />
		</>}

		{purchasedGift && <>
			<PurchasedGiftScreen />
		</>}



	</>
	

};
