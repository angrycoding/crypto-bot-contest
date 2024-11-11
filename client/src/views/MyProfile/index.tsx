import Switch from '../../components/Switch';
import styles from './index.module.scss';
import light from './light.svg';
import dark from './dark.svg';
import { useState } from 'react';
import useTheme from '../../hooks/useTheme';
import Header from '../../components/Header';
import ImageScreen from '../../components/ImageScreen';
import ballons from './balloons.svg';
import TabBar from '../../components/TabBar';
import ProfileScreen from '../../components/ProfileScreen';
import User from '../../../../shared/User';
import useMyRecentActions from '../../hooks/useMyRecentActions';
import BackButton from '../../components/BackButton';
import BottomButtons from '../../components/BottomButtons';
import useLanguage from '../../hooks/useLanguage';

const MyProfile = () => {
	

	const messages = useLanguage();
	const [ user, setUser ] = useState<User>();
	const [ showHistory, setShowHistory ] = useState(false);
	const myRecentActions = useMyRecentActions();
	const [ _, selectedTheme, selectTheme ] = useTheme();



	if (user) {
		return <>
			<TabBar.Hide />
			<BackButton onClick={() => setUser(undefined)} />
			<ProfileScreen value={user} />
		</>
	}

	return <>

		{!showHistory && (


			<>

				<Switch
					className={styles.themeSwitch}
					items={[{ image: light }, { label: 'A'}, { image: dark }]}
					value={{'light': 0, 'auto': 1, dark: 2}[selectedTheme]}
					onChange={theme => selectTheme(['light', 'auto', 'dark'][theme] as any)}
				/>

				<Switch
					className={styles.langSwitch}
					items={[{ label: 'EN' }, { label: 'RU' }]}
					value={messages.currentLang === 'ru' ? 1 : 0}
					onChange={isRu => messages.setLang(isRu ? 'ru' : 'en')}
				/>

				<ProfileScreen
					value={undefined}
					onRecentActions={myRecentActions ? () => setShowHistory(true) : undefined}
				/>

			</>
		)}

		{(showHistory && myRecentActions) && <>

			{myRecentActions.length ? <>

				<div style={{marginTop: 24}} />

				<Header
					title={messages.recentActions}
					subtitle={messages.hereIsYourActionHistory}
				/>

				<div className={styles.recentActions}>
					{myRecentActions.map(recentAction => (
						<div key={recentAction._id} className={styles.recentAction}>
							
							

							<div className={styles.giftAvatar} style={{
								backgroundImage: `url(/images/${recentAction.gift.image})`
							}} />


							
							{recentAction.status === 'purchased' && <>
								<div style={{flex: 1}}>
									{messages.formatDate(recentAction.date)}
									<div className={styles.operation}>Buy</div>
									<div className={styles.giftName}>{recentAction.gift.name}</div>
								</div>
								<div>-{recentAction.gift.price} {recentAction.gift.currency.toUpperCase()}</div>
							</>}

							{/* {recentAction.status === 'sent' && <>
								<div style={{flex: 1}}>
									{formatDate(recentAction.date)}
									<div className={styles.operation}>Sent</div>
									<div className={styles.giftName}>{recentAction.gift.name}</div>
								</div>
								<div>
									to{' '}
									<span style={{color: 'red'}} onClick={() => setUser(recentAction.to)}>
										{recentAction.to.userName}
									</span>
								</div>
							</>} */}

							{recentAction.status === 'received' && <>
								<div style={{flex: 1}}>
									{messages.formatDate(recentAction.date)}
									<div className={styles.operation}>Receive</div>
									<div className={styles.giftName}>{recentAction.gift.name}</div>
								</div>
								<div>
									from{' '}
									<span style={{color: 'red'}} onClick={() => setUser(recentAction.from)}>
										{recentAction.from.userName}
									</span>
								</div>
							</>}

						</div>
					))}
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
			<BackButton onClick={() => setShowHistory(false)} />
		</>}

	</>

}

export default MyProfile;