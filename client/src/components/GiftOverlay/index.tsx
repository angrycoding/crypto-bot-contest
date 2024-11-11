import Gift from "../../../../shared/Gift";
import SharedSettings from "../../../../shared/SharedSettings";
import useLanguage from "../../hooks/useLanguage";
import currencyInfo from "../../utils/currencyInfo";
import BottomButtons from "../BottomButtons";
import TabBar from "../TabBar";
import styles from './index.module.scss'
import ReactDOM from 'react-dom';

const GiftOverlay = (props: {
	value: Gift,
	title: string
	onClose?: () => void
}) => {

	const messages = useLanguage();
	const { title, onClose, value } = props;

	const doSend = () => {
		Telegram.WebApp.switchInlineQuery([
			useLanguage.getLang(),
			value.instanceId
		].join('-'), SharedSettings.isProduction ? ['users'] : ['users', 'bots']
	)
	}

	return ReactDOM.createPortal(<>
	
		<TabBar.Hide />
		
		<div className={styles.overlayBack} />
		
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

		<BottomButtons
			primaryButton={messages.sendGiftToContact}
			onPrimaryButtonClick={doSend}
		/>

	</>, document.body);
	
}

export default GiftOverlay;