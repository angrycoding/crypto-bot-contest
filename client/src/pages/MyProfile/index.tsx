import Switch from '../../components/Switch';
import styles from './index.module.scss';
import light from './light.svg';
import dark from './dark.svg';
import useTheme from '../../hooks/useTheme';
import ProfileScreen from '../../components/ProfileScreen';
import useLanguage from '../../hooks/useLanguage';
import { useNavigate } from 'react-router-dom';


const MyProfile = () => {
	
	const navigate = useNavigate();
	const messages = useLanguage();
	const { selectedTheme, setTheme } = useTheme();

	return <ProfileScreen value={undefined} onRecentActions={() => navigate('/myrecentactions')}>

		<Switch
			className={styles.themeSwitch}
			items={[{ image: light }, { label: 'A'}, { image: dark }]}
			value={{'light': 0, 'auto': 1, dark: 2}[selectedTheme]}
			onChange={theme => setTheme(['light', 'auto', 'dark'][theme] as any)}
		/>

		<Switch
			className={styles.langSwitch}
			items={[{ label: 'EN' }, { label: 'RU' }]}
			value={messages.currentLang === 'ru' ? 1 : 0}
			onChange={isRu => messages.setLang(isRu ? 'ru' : 'en')}
		/>
		
	</ProfileScreen>

}

export default MyProfile;