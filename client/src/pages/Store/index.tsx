import React from 'react';
import TabBar from '../../components/TabBar';
import styles from './index.module.scss';
import parseCSSColor from 'parse-css-color';
import { useState } from 'react';
import Header from '../../components/Header';
import useLanguage from '../../hooks/useLanguage';
import BottomButtons from '../../components/BottomButtons';
import useGiftList from '../../hooks/useGiftList';
import SocketIO from '../../utils/SocketIO';
import User from '../../../../shared/User';
import useGiftRecentActions from '../../hooks/useGiftRecentActions';
import AnimationView from '../../components/AnimationView';
import Avatar from '../../components/Avatar';
import { useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import currencyInfo from '../../utils/currencyInfo';
import formatItems from '../../utils/formatItems';
import Preloader from '../../components/Preloader';



const convertColor = (color: any, opacity: number) => {
	return `rgba(${color.values.join(',')}, ${opacity})`
}

const Store = () => {


	const navigate = useNavigate();
	const activeGiftId = useParams()?.['giftId'];
	const gifts = useGiftList();
	const messages = useLanguage();
	const [ isPurchasing, setIsPurchasing ] = useState(false);
	const recentActions = useGiftRecentActions(activeGiftId);


	const navigateToUserProfile = (user?: User) => {
		if (!user) return;
		navigate(user.isMe ? '/myprofile' : `/leaderboard/${user.userId}`);
	}
		
	const doPurchase = () => {
		if (!activeGiftId) return;
		setIsPurchasing(true);
		SocketIO.emit('purchaseGift', activeGiftId, (paymentUrl) => {
			if (paymentUrl) {
				Telegram.WebApp.openTelegramLink(paymentUrl);
			} else {
				alert('error, please try again later...');
			}
			window.setTimeout(() => setIsPurchasing(false), 500);
		});
	}

	
	if (!gifts) return <Preloader />


	const activeItem = gifts?.find(gift => gift.giftId === activeGiftId);

	return <>

		{(!activeItem && gifts) && (
			<AnimationView key="list">
				<div className={styles.listView}>
					<div className={styles.scrollbox}>
						<Header withImage={true} title={messages.buyAndSend} subtitle={messages.uniqueGifts} />
						<div className={styles.grid}>
							{gifts.map(gift => (
								<div key={gift._id} className={styles.item} style={{
									'--currencyIcon': `url(${currencyInfo[gift.currency].icon})`,
									'--fromColor': convertColor(parseCSSColor(gift.color), 0.2),
									'--toColor': convertColor(parseCSSColor(gift.color), 0.05)
								} as React.CSSProperties} onMouseDown={
									gift.purchased >= gift.total ?
									undefined :
									() => navigate(`/${gift.giftId}`)
								}>
									<div className={styles.count}>
										{formatItems(gift.purchased)}
										{' '}
										{messages.of}
										{' '}
										{formatItems(gift.total)}
									</div>
									<div className={styles.image} data-animateid={`image-${gift.giftId}`} style={{
										backgroundImage: `url(/images/${gift.image})`
									}} />
									<div className={styles.label}>{gift.name}</div>

									{gift.purchased >= gift.total ? (
										<div className={clsx(styles.button, styles.soldout)}>
											{messages.soldout}
										</div>
									) : (
										<div className={styles.button}>
											{gift.price}
											{' '}
											{gift.currency.toUpperCase()}
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</AnimationView>
		)}

		

		{activeItem && (
			<AnimationView key="item">
				<div className={styles.itemView} style={{
					'--currencyIcon': `url(${currencyInfo[activeItem.currency].icon})`,
					'--currencyColor': currencyInfo[activeItem.currency].color,
					'--fromColor': convertColor(parseCSSColor(activeItem.color), 0.2),
					'--toColor': convertColor(parseCSSColor(activeItem.color), 0.1)
				} as React.CSSProperties}>
					
					<div className={styles.imageOuter}>
						<div className={styles.imageInner} 
						data-animateid={`image-${activeItem.giftId}`}
						style={{ backgroundImage: `url(/images/${activeItem.image})`}} />
					</div>

					<div className={styles.titleAndCount}>
						<div>{activeItem.name}</div>
						<div>
							{formatItems(activeItem.purchased)}
							{' '}
							{messages.of}
							{' '}
							{formatItems(activeItem.total)}
						</div>
					</div>

					<div className={styles.description}>
						{messages.purchaseThisGift}
					</div>
					<div className={styles.price}>
						{activeItem.price}
						{' '}
						{activeItem.currency.toUpperCase()}
					</div>


					{Boolean(recentActions.length) && <>
						<div className={styles.divider} />
						<div className={styles.recentActionsTitle}>
							{messages.recentActions}
						</div>

						{recentActions.map(operation => operation.from && <div key={operation._id}>

							<Avatar
								className={styles.avatar}
								userId={operation.from.userId}
								onClick={() => navigateToUserProfile(operation.from)}
								operation={operation.status === 'received' ? 'send' : 'buy'}
							/>
							
							<div className={styles.text}>


								{operation.status === 'purchased' && <>
									<div>{messages.buyGift}</div>
									<div>
										<span onClick={() => navigateToUserProfile(operation.from)}>
											{operation.from.isMe ? messages.you : operation.from.userName}
										</span>
										{' '}
										{operation.from.isMe ? messages.youBoughtGift : messages.boughtGift}
									</div>
								</>}

								{operation.status === 'received' && <>
									<div>{messages.sendGiftAction}</div>
									<div>
										<span onClick={() => navigateToUserProfile(operation.from)}>
											{operation.from.isMe ? messages.you : operation.from.userName}
										</span>
										{' '}
										{operation.from.isMe ? messages.youSentGiftTo : messages.sentGiftTo}
										{' '}
										<span onClick={() => navigateToUserProfile(operation.to)}>
											{operation.to?.isMe ? messages.you : operation.to?.userName}
										</span>
									</div>
								</>}



							</div>
						</div>)}
					</>}

				</div>

				<TabBar.Hide />

				<BottomButtons
					primaryButton={activeItem.purchased < activeItem.total ? messages.buyAGift : ''}
					primaryButtonLoading={isPurchasing}
					onPrimaryButtonClick={doPurchase}
				/>

			</AnimationView>
		)}


	</>

}



export default Store;