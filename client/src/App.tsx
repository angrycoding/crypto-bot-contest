import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Store from './pages/Store';
import MyGifts from './pages/MyGifts';
import MyProfile from './pages/MyProfile';
import TabBar from './components/TabBar';
import LeaderBoard from './pages/LeaderBoard';
import ReceiveGift from './pages/ReceiveGift';
import BackButton from './components/BackButton';
import ProfileScreen from './components/ProfileScreen';
import usePurchasedGift from './hooks/usePurchasedGift';
import getReceiveGiftInstanceId from './utils/getReceiveGiftInstanceId';
import PurchasedGiftScreen from './pages/PurchasedGiftScreen';
import MyRecentActions from './pages/MyRecentActions';


const App = () => {

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
				<Route path='/myprofile' element={<MyProfile />} />
				<Route path='/leaderboard' element={<LeaderBoard />} />
				<Route path='/gifts/:instanceId?' element={<MyGifts />} />
				<Route path='/myrecentactions' element={<MyRecentActions />} />
				<Route path='/leaderboard/:userId' element={<ProfileScreen value={undefined} />} />

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

export default App;