import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import SocketIO from '../../utils/SocketIO';
import ProfileScreen from '../../components/ProfileScreen';
import User from '../../../../shared/User';
import BackButton from '../../components/BackButton';
import Avatar from '../../components/Avatar';
import { useNavigate } from 'react-router-dom';
import AnimationView from '../../components/AnimationView';
import useLanguage from '../../hooks/useLanguage';
import ImageScreen from '../../components/ImageScreen';
import BottomButtons from '../../components/BottomButtons';
import TabBar from '../../components/TabBar';
import NoItems from '../../components/NoItems';

const LeaderBoard = () => {

	const navigate = useNavigate();
	const messages = useLanguage();
	const [ animateId, setAnimateId ] = useState('');
	const [ searchValue, setSearchValue ] = useState('');
	const [ leaderBoard, setLeaderBoard ] = useState<User[]>();

	const navigateToUserProfile = (user: User) => {
		navigate(user.isMe ? '/myprofile' : `/users/${user.userId}`);
	}

	useEffect(() => {
		SocketIO.emit('getLeaderBoard', setLeaderBoard);
	}, [])


	if (!leaderBoard) return <></>

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
	


	return <AnimationView key="list">
		
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
							setAnimateId(user.userId);
							window.requestAnimationFrame(() => {
								navigateToUserProfile(user)
							});
						}}>


							<Avatar userId={user.userId} className={styles.avatar}  animateId={Boolean(animateId)} />

							<div>
								<div className={styles.name}>
									{user.userName}
									{user.isMe && <span>{messages.you}</span>}
								</div>
								<div className={styles.count}>
									{user.giftsReceived}
									{' '}
									{user.giftsReceived === 1 ? messages.oneGift : messages.manyGifts}
								</div>
							</div>
							<div className={styles.number} data-index={index + 1} />
						</div>
					))}
				</div>
			)}


		</div>
	</AnimationView>
}

export default LeaderBoard;