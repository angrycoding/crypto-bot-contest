import User from '../../../../shared/User';
import styles from './index.module.scss';
import NoItems from '../NoItems';
import Avatar from '../Avatar';
import useLanguage from '../../hooks/useLanguage';
import useProfile from '../../hooks/useProfile';
import { useState } from 'react';
import Gift from '../../../../shared/Gift';
import GiftOverlay from '../GiftOverlay';
import BottomButtons from '../BottomButtons';
import BackButton from '../BackButton';
import { useParams } from 'react-router-dom';
import formatItems from '../../utils/formatItems';
import AnimationView from '../AnimationView';

const ProfileScreen = (props: {
	value: User | undefined,
	onRecentActions?: () => void
}) => {

	const userId = useParams()?.userId;
	const messages = useLanguage();
	const { onRecentActions, value } = props;
	const profileData = useProfile(value?.userId || userId || 'me');

	
	const [ selectedGift, setSelectedGift ] = useState<Gift>();

	const showList = () => {
		setSelectedGift(undefined)
	}

	return <AnimationView>
		<div className={styles.wrapper}>

			<div className={styles.header}>
				<div className={styles.avatarWrapper} data-animateid={userId}>
					<Avatar userId={profileData?.userId} className={styles.avatar} />
					<div className={styles.number}>#{profileData?.raiting}</div>
				</div>
				<div className={styles.nameWrapper}>{profileData?.userName}</div>

				<div className={styles.giftsReceived}>
					{profileData?.giftsReceived}
					{' '}
					{messages.giftsReceived}
				</div>

				{onRecentActions && (
					<div className={styles.recentActions} onClick={onRecentActions}>
						{messages.recentActions}{' '}›
					</div>
				)}
			</div>

			{profileData?.receivedGifts?.length === 0 && (
				<NoItems />
			)}

			{profileData?.receivedGifts?.length > 0 && (
				<div className={styles.scrollbox}>
					<div className={styles.grid}>
						
						{profileData?.receivedGifts.map((gift: Gift) => gift.from && <div key={gift._id} onClick={() => {
							setSelectedGift(gift);
						}}>
							<Avatar className={styles.from} userId={gift.from?.userId} />
							<div className={styles.stats}>
								{formatItems(gift.purchased)}
								{' '}
								{messages.of}
								{' '}
								{formatItems(gift.total)}
							</div>
							<div className={styles.image} style={{backgroundImage: `url(/images/${gift.image})`}} />
							<div className={styles.name}>{gift.name}</div>
						</div>)}

					</div>
				</div>
			)}

			{selectedGift && <>
				<GiftOverlay
					value={selectedGift}
					title={selectedGift.name}
					onClose={showList}
				/>
				<BackButton onClick={showList} />
				<BottomButtons
					primaryButton={messages.close}
					onPrimaryButtonClick={showList}
				/>
			</>}


		</div>
	</AnimationView>;

}

export default ProfileScreen;