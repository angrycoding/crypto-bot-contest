import styles from './index.module.scss';
import storeItem from './tab-store.json';
import giftsItem from './tab-gifts.json';
import leaderboardItem from './tab-leaderboard.json';
import profileItem from './tab-profile.json';
import { useEffect, useRef } from 'react';
import Lottie from 'react-lottie';
import useLanguage from '../../hooks/useLanguage';
import clsx from 'clsx';

type TabId = 
	'store' |
	'gifts' |
	'leaderboard' |
	'myprofile' |
	'inactive'


type TabBarItem = {
	id: TabId,
	image: any
}

const tabBarItems: TabBarItem[] = [{
	id: 'store',
	image: storeItem,
}, {
	id: 'gifts',
	image: giftsItem,
}, {
	id: 'leaderboard',
	image: leaderboardItem,
}, {
	id: 'myprofile',
	image: profileItem,
}]

const defaultOptions = {
	loop: false,
	autoplay: false
};

const restartAnimation = (lottie: any) => {
	window.requestAnimationFrame(() => {
		try { lottie?.stop?.(); } catch (e) {}
		try { lottie?.play?.(); } catch (e) {}
	});
}


const TabBarBase = (
	props: {
		value: TabId,
		onChange?: (value: TabId) => void
	}
) => {

	const messages = useLanguage();
	const itemsRef = useRef<Lottie[]>([]);
	const { value, onChange } = props;

	const onSetItem = (event: Event) => {
		const value = (event as CustomEvent<TabId>).detail;
		onChange?.(value);
		event.stopImmediatePropagation();
	}

	useEffect(() => {

		document.addEventListener('setTabBarItem', onSetItem);

		return () => {
			document.removeEventListener('setTabBarItem', onSetItem);
		}

	}, []);

	return <div className={clsx(styles.tabbar, value === 'inactive' && styles.tabbarHide)}>

			{tabBarItems.map((item, index) => (
				
				<div key={item.id} data-active={item.id === value ? 1 : undefined} onPointerDown={() => {
					const re = itemsRef.current[index];
					onChange?.(item.id)
					if (item.id !== value) restartAnimation(re)
				}}>

					<Lottie
						ref={(el: Lottie) => itemsRef.current[index] = el}
						options={{...defaultOptions, animationData: item.image}}
						isStopped={true}
						isClickToPauseDisabled={true}
					/>

					<span>{messages[item.id as never]}</span>
				</div>
			))}


		</div>
	
}

const TabBar = Object.assign(TabBarBase, {
	Hide: () => <div className={styles.tabbarHide} />,
	navigate: (detail: TabId) => {
		document.dispatchEvent(new CustomEvent<TabId>('setTabBarItem', { detail }))
	}
})

export default TabBar;