import { useRef, useState } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';

interface Item {
	label?: string
	image?: string
}

const Switch = (props: {
	items: Item[]
	value: number,
	className?: string
	onChange: (value: number) => void
}) => {

	const { className, items, value, onChange } = props;

	const [ dir, setDir ] = useState(
		value === 0 ? 'right' :
		value === items.length - 1 ? 'left' :
		'right'
	)

	const doToggle = () => {

		let newValue = value;

		if (dir === 'right') {
			
			newValue++;

			if (newValue === items.length) {
				setDir('left');
				newValue -= 2;
			}


		}

		else if (dir === 'left') {
			newValue--;
			if (newValue < 0) {
				setDir('right');
				newValue += 2;
			}
		}
		onChange(newValue);


	}


	return <div className={clsx(
		styles.wrapper,
		value && styles.right,
		className
	)} onPointerDown={doToggle} style={{
		'--itemSize': `${100 / items.length}%`,
		'--itemPos': `${100 / (items.length - 1) * value}%`
	} as React.CSSProperties}>

		{items.map((item, index) => (
			<div key={index} data-active={value === index ? '1' : undefined} style={{'--image': `url(${item.image})`} as React.CSSProperties}>{item.label}</div>
		))}

	</div>

}

export default Switch;