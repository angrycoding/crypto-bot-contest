import styles from './index.module.scss';

const Header = (props: {
	title: string,
	subtitle: string,
	withImage?: boolean
}) => {

	return (
		<div className={styles.header}>
			{props.withImage && (
				<div className={styles.image} />
			)}
			<div className={styles.title}>{props.title}</div>
			<div className={styles.subtitle}>{props.subtitle}</div>
		</div>

	)
}

export default Header;