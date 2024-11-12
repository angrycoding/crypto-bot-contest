import clsx from 'clsx';
import styles from './index.module.scss';
import { useEffect, useRef } from 'react';

const elementIsAtPoint = (element: HTMLElement, x: number, y: number) => {

	let el2 = document.elementFromPoint(x, y);

	while (el2 instanceof HTMLElement) {
		if (el2 === element) return true;
		el2 = el2.parentElement;
	}

	return false;
};

const getVisibleViewPort = (element: any) => {


	if (!(element instanceof HTMLElement)) return 0;

	const rect = element.getBoundingClientRect();
	const x = rect.x + rect.width / 2;
	const { offsetHeight } = element;

	if (!offsetHeight) {
		return 0;
	}

	if (!elementIsAtPoint(element, x, rect.y) && !elementIsAtPoint(element, x, rect.bottom - 1)) {
		return 0;
	}

	let visibleHeight = 0;
	for (let c = 0; c < offsetHeight; c++) {
		if (elementIsAtPoint(element, x, rect.y + c)) {
			visibleHeight++;
		}
	}

	return visibleHeight / offsetHeight * 100;

};



const Header = (props: {
	title?: string,
	subtitle?: string,
	withImage?: boolean,
	className?: string,
	children?: any
}) => {

	const wrapperRef = useRef<HTMLDivElement>(null);

	const onScroll = () => {
		const wrapper = wrapperRef.current;
		if (!wrapper) return;
		let zoom = getVisibleViewPort(wrapper);
		zoom = 1 / 100 * zoom;
		zoom =  0.5 + Math.pow(zoom, 0.5) * 0.5
		wrapper.style.setProperty('--zoom',  `${zoom}`)
	}


	useEffect(() => {
		document.addEventListener('scroll', onScroll, { capture: true, passive: true })
		return () => {
			document.removeEventListener('scroll', onScroll, { capture: true });
		}
	})

	return (
		<div className={clsx(styles.header, props.className)} ref={wrapperRef}>
			{props.children || (
				<div>
					{props.withImage && (
						<div className={styles.image} />
					)}
					<div className={styles.title}>{props.title}</div>
					<div className={styles.subtitle}>{props.subtitle}</div>
				</div>
			)}
		</div>

	)
}

export default Header;