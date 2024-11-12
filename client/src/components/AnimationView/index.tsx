import React from "react";
import styles from './index.module.scss';
import animationEnd from "../../utils/animationEnd";

const AnimationView = class extends React.Component<{ children: any }> {

	private ref: React.RefObject<HTMLDivElement> = React.createRef();

	private static instanceCount = 0;

	componentDidMount = async() => {

		AnimationView.instanceCount++;

		const my = this.ref.current;
		if (!(my instanceof HTMLElement)) return;
		
		const clone = document.querySelector('*[data-clone="1"]');
		if (!(clone instanceof HTMLElement)) {
			my.style.opacity = '1';
			return;
		}


		
		const whats = Array.from(clone.querySelectorAll(`*[data-animateid]`));

		const pairs: Array<[HTMLElement, HTMLElement]> = [];

		for (const what of whats) {
			if (!(what instanceof HTMLElement)) continue;
			const id = what.dataset.animateid;
			const to = my.querySelector(`*[data-animateid="${id}"]`);
			if (!(to instanceof HTMLElement)) continue;
			pairs.push([ what, to ]);
		}

		if (!pairs.length) {
			my.style.opacity = '1';
			clone.remove();
			return;
		}

		

		const symbols: HTMLElement[] = []

		for (const [ from, to ] of pairs) {
			
			
			const fromBox = from.getBoundingClientRect();
			const toBox = to.getBoundingClientRect();


			const fromClone = from.cloneNode(true);
			if (fromClone instanceof HTMLElement) {
				fromClone.style.position = 'absolute';
				fromClone.style.left = `${fromBox.left}px`;
				fromClone.style.top = `${fromBox.top}px`;
				fromClone.style.maxWidth = fromClone.style.minWidth = fromClone.style.width = `${fromBox.width}px`;
				fromClone.style.maxHeight = fromClone.style.minHeight = fromClone.style.height = `${fromBox.height}px`;
				fromClone.classList.add(styles.superClone);


				fromClone.style.setProperty('--toLeft', `${toBox.left}px`);
				fromClone.style.setProperty('--toTop', `${toBox.top}px`);
				fromClone.style.setProperty('--toWidth', `${toBox.width}px`);
				fromClone.style.setProperty('--toHeight', `${toBox.height}px`);

				const style = getComputedStyle(from)
				fromClone.style.backgroundImage = style.backgroundImage;
				
				document.documentElement.appendChild(fromClone);
				symbols.push(fromClone);

			}


			from.style.visibility = 'hidden';
			to.style.visibility = 'hidden';


		}

		clone.classList.add(styles.foobar1);
		my.classList.add(styles.foobar2);


		await animationEnd(styles.move);

		clone.remove();
		my.classList.remove(styles.foobar2);
		my.style.opacity = '1';

		for (const s of symbols) s.remove();

		for (const [ _, to ] of pairs) {
			to.style.visibility = '';
		}

		

	}

	componentWillUnmount(): void {

		AnimationView.instanceCount--;

		if (!this.ref.current) return;
		const clone = this.ref.current.cloneNode(true);
		if (clone instanceof HTMLElement) {
			this.ref.current.parentElement?.appendChild(clone);
			clone.dataset.clone = '1';
		}

		// window.setTimeout(() => {
		window.requestAnimationFrame(() => {
			if (!AnimationView.instanceCount) {
				// @ts-ignore
				clone.remove();
			}
		});
		// }, 100);
	}

	render() {
		return <div style={{
			position: 'fixed', inset: 0,

			opacity: 0

		}} ref={this.ref}>
			{this.props.children}
		</div>
	}
}

export default AnimationView;