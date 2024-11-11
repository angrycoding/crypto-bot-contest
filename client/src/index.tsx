import App from './App';
import ReactDOM from 'react-dom/client';
import useTheme from './hooks/useTheme';
import { BrowserRouter } from 'react-router-dom';

useTheme.update();
Telegram.WebApp.disableVerticalSwipes();
Telegram.WebApp.expand();
Telegram.WebApp.BackButton.hide();
Telegram.WebApp.ready();

ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);