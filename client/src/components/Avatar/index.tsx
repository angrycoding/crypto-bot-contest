import styles from './index.module.scss';

const Avatar = (props: {
	userId: string,
	className?: string,
	onClick?: () => void,
	operation?: 'send' | 'buy',
	animateId?: boolean
}) => {

	const { className, userId, onClick, operation, animateId } = props;

	return <div className={className} onClick={onClick}>
		<div className={styles.avatar} style={{
			'--image': `url(/avatars/${userId}.png)`
		} as React.CSSProperties} data-animateid={animateId ? userId : undefined}>
			<div className={styles.placeholder} />
			{operation === 'send' && <span className={styles.send} />}
			{operation === 'buy' && <span className={styles.buy} />}
		</div>
	</div>
}

export default Avatar;