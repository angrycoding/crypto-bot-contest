import styles from './index.module.scss';

const ImageScreen = (props: {
	image?: string
	title: any,
	subtitle: any,
	toastTitle?: any,
	toastDescr?: any,
	toastAction?: any
	onToastAction?: () => void
}) => {

	const { image, title, subtitle } = props;
	const { toastTitle, toastDescr, toastAction, onToastAction } = props;

	const imageBg = image ? image.startsWith('/') ? `url(${image})` : `url(/images/${image})` : ''

	return (
		<div className={styles.wrapper}>

			<div className={styles.image} style={{
				backgroundImage: imageBg
			}} />
			
			<div className={styles.title} dangerouslySetInnerHTML={{__html: title}} />

			<div className={styles.subtitle} dangerouslySetInnerHTML={{__html: subtitle}} />
			
			{toastTitle && (
				<div className={styles.toast} onClick={onToastAction} style={{
					'--image': imageBg
				} as React.CSSProperties}>
					<div>
						<div>{toastTitle}</div>
						<div>{toastDescr}</div>
					</div>
					<div>{toastAction}</div>
				</div>
			)}

		</div>

	)

}

export default ImageScreen;