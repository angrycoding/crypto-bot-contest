import Header from "../../components/Header";
import styles from './index.module.scss';
import NoItems from "../../components/NoItems";
import GiftOverlay from "../../components/GiftOverlay";
import useMyGiftList from "../../hooks/useMyGiftList";
import Gift from "../../../../shared/Gift";
import useLanguage from "../../hooks/useLanguage";
import { useNavigate, useParams } from "react-router-dom";
import Preloader from "../../components/Preloader";

const MyGifts = () => {

	const navigate = useNavigate();
	const instanceId = useParams()?.instanceId;
	const messages = useLanguage();
	const myGifts = useMyGiftList();

	const sendGift = myGifts?.find(g => g.instanceId === instanceId);


	if (!myGifts) return <Preloader />

	
	return <div className={styles.wrapper}>
		
		<Header title={messages.sendGifts} subtitle={messages.sendGiftsToUsers} />


		{myGifts && myGifts?.length === 0 && (
			<NoItems />
		)}

		{myGifts && myGifts?.length > 0 && (
			<div className={styles.grid}>
				{myGifts.map((myGift: Gift) => (
					<div onClick={() => navigate(`/gifts/${myGift.instanceId}`)} key={myGift.instanceId}>
						<div className={styles.name}>{myGift.name}</div>
						<div className={styles.image} style={{ backgroundImage: `url(/images/${myGift.image})` }} />
						<div className={styles.send}>{messages.send}</div>
					</div>
				))}
			</div>
		)}

		{sendGift && (
			<GiftOverlay
				value={sendGift}
				title={messages.sendGift}
				onClose={() => window.history.back()}
			/>
		)}

	</div>
}

export default MyGifts;