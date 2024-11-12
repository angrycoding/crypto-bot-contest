import Lottie from 'react-lottie';
import styles from './index.module.scss';
import balloons from './emoji-balloons.json';
import TabBar from '../TabBar';
import useLanguage from '../../hooks/useLanguage';
import clsx from 'clsx';

const NoItems = (props: {
	customTitle?: string,
	hideAction?: boolean,
	className?: string
}) => {

	const { customTitle, hideAction, className } = props;
	const messages = useLanguage();

	return (
		<div className={clsx(styles.noItems, className)}>
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