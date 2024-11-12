import { useNavigate } from "react-router-dom";
import Gift from "../../../../shared/Gift";
import SharedSettings from "../../../../shared/SharedSettings";
import useLanguage from "../../hooks/useLanguage";
import currencyInfo from "../../utils/currencyInfo";
import Avatar from "../Avatar";
import BottomButtons from "../BottomButtons";
import TabBar from "../TabBar";
import styles from './index.module.scss'
import ReactDOM from 'react-dom';
import React from "react";
import User from "../../../../shared/User";

const transitionEnd = (element: HTMLElement, propertyName: string) => new Promise<void>(resolve => {
	const handler = (event: TransitionEvent) => {
		if (event.propertyName !== propertyName) return;
		element.removeEventListener('transitionend', handler);
		return resolve();
	}
	element.addEventListener('transitionend', handler);
});

class GenericOverlay extends React.Component <{ children?: any }> {

	private wrapperRef: React.RefObject<HTMLDivElement> = React.createRef();

	componentDidMount() {
		const wrapper = this.wrapperRef.current;
		if (!wrapper) return;
		wrapper.style.setProperty('--expanded', '0');
		window.requestAnimationFrame(() => {
			wrapper.style.setProperty('--expanded', '1');
		})
	}
	
	componentWillUnmount = async() => {
		const wrapper = this.wrapperRef.current;
		if (!wrapper) return;
		const clone = wrapper.cloneNode(true);
		if (!(clone instanceof HTMLElement)) return;
		document.body.appendChild(clone);
		window.setTimeout(async() => {
			clone.style.setProperty('--expanded', '0');
			await transitionEnd(clone, 'transform');
			clone.remove();
		}, 0);
	}
	
	render() {
		return ReactDOM.createPortal(<div className={styles.wrapper} ref={this.wrapperRef}>
			<div className={styles.children}>
				{this.props.children}
			</div>
		</div>, document.body);
	}
	
}

const GiftOverlay = (props: {
	value: Gift,
	title: string
	onClose?: () => void,
	hideFrom?: boolean
}) => {

	const navigate = useNavigate();
	const messages = useLanguage();
	const { title, onClose, value } = props;

	const doSend = () => {
		Telegram.WebApp.switchInlineQuery([
			useLanguage.getLang(),
			value.instanceId
		].join('-'), SharedSettings.isProduction ? ['users'] : ['users', 'bots'])
	}

	const doNavigate = (user?: User) => {
		if (!user) return;
		onClose?.();
		navigate(user?.isMe ? '/myprofile' : `/leaderboard/${user?.userId}`)
	}

	return <GenericOverlay>



			<div className={styles.overlay} style={{
				'--currencyIcon': `url(${currencyInfo[value.currency].icon})`,
				'--currencyColor': currencyInfo[value.currency].color,
			} as React.CSSProperties}>
				
				<div className={styles.close} onClick={onClose} />
				
				<div className={styles.image} style={{
					'--image': `url(/images/${value.image})`
				} as React.CSSProperties} />

				<div className={styles.title}>
					{title}
				</div>
				
				<div className={styles.table}>

					{(value?.from && !props.hideFrom) && <>
						<div>{messages.from}</div>
						<div onClick={() => doNavigate(value.from)}>
							<Avatar userId={value.from.userId} className={styles.avatar} />
							{value.from.userName}
						</div>
					</>}

					<div>{messages.gift}</div>
					<div>{value.name}</div>

					{/* @ts-ignore */}
					{value?.date && <>
						<div>{messages.date}</div>
						{/* @ts-ignore */}
						<div>{messages.formatDate(value.date)}</div>
					</>}
					
					<div>{messages.price}</div>
					<div>
						<div className={styles.priceIcon} />
						{value.purchasePrice}{' '}{value.currency.toUpperCase()}
					</div>
					<div>{messages.availability}</div>
					<div>
						{value.purchased}
						{' '}
						{messages.of}
						{' '}
						{value.total}
					</div>
				</div>
			</div>

			<TabBar.Hide />
			
			<BottomButtons
				primaryButton={messages.sendGiftToContact}
				onPrimaryButtonClick={doSend}
			/>
	</GenericOverlay>
}

export default GiftOverlay;