import ballons from './balloons.svg';
import React from "react";
import BackButton from "../../components/BackButton";
import BottomButtons from "../../components/BottomButtons";
import Header from "../../components/Header";
import ImageScreen from "../../components/ImageScreen";
import TabBar from "../../components/TabBar";
import useLanguage from "../../hooks/useLanguage";
import useMyRecentActions from "../../hooks/useMyRecentActions";
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import Preloader from '../../components/Preloader';
import User from '../../../../shared/User';

const MyRecentActions = () => {

	const navigate = useNavigate();
	const messages = useLanguage();
	const myRecentActions = useMyRecentActions();
	if (!myRecentActions) return <Preloader />

	const navigateToUserProfile = (user: User | undefined) => {
		if (!user) return;
		navigate(user.isMe ? '/myprofile' : `/leaderboard/${user.userId}`);
	}

	return <div className={styles.wrapper}>

		{Object.keys(myRecentActions).length ? <>

			<Header
				className={styles.header}
				title={messages.recentActions}
				subtitle={messages.hereIsYourActionHistory}
			/>

			<div className={styles.recentActions}>


				{Object.keys(myRecentActions).map(date => <React.Fragment key={date}>
					<div className={styles.date}>{date}</div>

					{myRecentActions[date].map(recentAction => (
						<div key={[recentAction._id, recentAction.status, recentAction.date].join('-')} className={styles.recentAction} style={{
							'--image': `url(/images/${recentAction.image})`
						} as React.CSSProperties}>


							{recentAction.status === 'purchased' && <>
								<div>
									<div className={styles.operation}>
										{messages.buy}
									</div>
									<div className={styles.giftName}>{recentAction.name}</div>
								</div>

								<div>-{recentAction.purchasePrice} {recentAction.currency.toUpperCase()}</div>
							</>}

							{recentAction.status === 'received' && recentAction?.from?.isMe && recentAction.to && !recentAction.to.isMe && <>
								<div>
									<div className={styles.operation}>
										{messages.sending}
									</div>
									<div className={styles.giftName}>{recentAction.name}</div>
								</div>
								<div>
									{messages.leaderBoardTo}{' '}
									<div className={styles.name} onClick={() => navigateToUserProfile(recentAction.to)}>
										{recentAction.to.userName}
									</div>
								</div>
							</>}



							{recentAction.status === 'received' && recentAction?.to?.isMe && recentAction.from && !recentAction.from.isMe && <>
								<div>
									<div className={styles.operation}>
										{messages.receiving}
									</div>
									<div className={styles.giftName}>{recentAction.name}</div>
								</div>
								<div>
									{messages.leaderBoardFrom}{' '}
									<div className={styles.name} onClick={() => navigateToUserProfile(recentAction.from)}>
										{recentAction.from.userName}
									</div>
								</div>
							</>}




						</div>
					))}
				</React.Fragment>)}


			</div>
		
		</> : <>
			<ImageScreen
				image={ballons}
				title={messages.historyIsEmpty}
				subtitle={messages.historyIsEmptyHint}
			/>
			<BottomButtons
				primaryButton={messages.openStore}
				onPrimaryButtonClick={() => TabBar.navigate('store')}
			/>
		</>}
		
		<TabBar.Hide />
		<BackButton onClick={() => navigate(-1)} />

	</div>


}

export default MyRecentActions;