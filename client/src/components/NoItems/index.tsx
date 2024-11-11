import Lottie from 'react-lottie';
import styles from './index.module.scss';
import balloons from './emoji-balloons.json';
import TabBar from '../TabBar';
import useLanguage from '../../hooks/useLanguage';

const NoItems = (props: {
	customTitle?: string,
	hideAction?: boolean
}) => {

	const { customTitle, hideAction } = props;
	const messages = useLanguage();

	return (
		<div className={styles.noItems}>
			<Lottie options={{ autoplay: true, loop: false, animationData: balloons }} />
			
			<div>{customTitle || messages.youDontHaveGiftsYet}</div>

			{hideAction ? <div /> : (
				<div onClick={() => TabBar.navigate('store')}>
					{messages.openStore}
				</div>
			)}
		</div>
	);
};

export default NoItems;