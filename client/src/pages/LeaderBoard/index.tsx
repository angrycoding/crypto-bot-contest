import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import SocketIO from '../../utils/SocketIO';
import User from '../../../../shared/User';
import Avatar from '../../components/Avatar';
import { useNavigate } from 'react-router-dom';
import useLanguage from '../../hooks/useLanguage';
import ImageScreen from '../../components/ImageScreen';
import BottomButtons from '../../components/BottomButtons';
import TabBar from '../../components/TabBar';
import NoItems from '../../components/NoItems';
import Preloader from '../../components/Preloader';

const LeaderBoard = () => {

	const navigate = useNavigate();
	const messages = useLanguage();
	const [ searchValue, setSearchValue ] = useState('');
	const [ leaderBoard, setLeaderBoard ] = useState<User[]>();

	const navigateToUserProfile = (user: User) => {
		navigate(user.isMe ? '/myprofile' : `/leaderboard/${user.userId}`);
	}

	useEffect(() => {
		SocketIO.emit('getLeaderBoard', setLeaderBoard);
	}, [])


	if (!leaderBoard) return <Preloader />

	if (!leaderBoard.length) {
		return <>
			<ImageScreen
				image={'ballons'}
				title={messages.ratingIsEmpty}
				subtitle={messages.historyIsEmptyHint}
			/>
			<BottomButtons
				primaryButton={messages.openStore}
				onPrimaryButtonClick={() => TabBar.navigate('store')}
			/>
		</>

	}

	const hasSearchValue = searchValue.trim().length > 2;

	const filteredLeaderBoard = hasSearchValue ? leaderBoard.filter(
		item => item?.userName?.toLowerCase?.().trim?.().includes(searchValue.toLowerCase()?.trim?.())
	) : leaderBoard;
	


	return <>
		
		<div className={styles.wrapper}>
		

		
			
			<div className={styles.header}>

				<div className={styles.inputWrapper}>

					<input type="search"
						value={searchValue}
						onChange={e => setSearchValue(e.target.value)}
					/>
					
					<div className={styles.placeholder}>
						{messages.search}
					</div>
				</div>



			</div>

			{hasSearchValue && !filteredLeaderBoard.length ? (
				
				<div className={styles.noItems}>
					<NoItems
						customTitle={messages.noResults}
						hideAction={true}
					/>
				</div>

			) : (
				<div className={styles.scrollbox}>
					{filteredLeaderBoard.map((user: User, index: number) => (
						<div key={user._id} onClick={() => {
							navigateToUserProfile(user)
						}}>


							<Avatar userId={user.userId} className={styles.avatar} 
							
								animateId={
									// animateId === '' ?
									// true :
									// animateId === user.userId
									true
								} />

							<div>
								<div className={styles.name}>
									{user.userName}
									{user.isMe && <span>{messages.you}</span>}
								</div>
								<div className={styles.count}>
									{messages.formatGifts(user.giftsReceived)}
								</div>
							</div>
							<div className={styles.number} data-index={index + 1} />
						</div>
					))}
				</div>
			)}


		</div>
	</>
}

export default LeaderBoard;