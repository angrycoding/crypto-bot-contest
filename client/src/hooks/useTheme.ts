import { useEffect } from "react";
import theme from '../index.module.scss';
import useForceUpdate from "./useForceUpdate";
import parseCSSColor from "parse-css-color";

type RealTheme = 'light' | 'dark';

type SelectedTheme = RealTheme | 'auto';

const getSelectedTheme = (): SelectedTheme => {
	const result = localStorage.getItem('theme') || '';
	return (['auto', 'light', 'dark'].includes(result) ? result : 'auto') as SelectedTheme;
}

const getRealTheme = () => {
	const selectedTheme = getSelectedTheme();
	if (['light', 'dark'].includes(selectedTheme)) return selectedTheme;
	return Telegram.WebApp.colorScheme || 'light' as any;
}

const useThemeBase = (): {
	realTheme: RealTheme,
	selectedTheme: SelectedTheme,
	setTheme: (theme: SelectedTheme) => void
} => {

	const forceUpdate = useForceUpdate();

	useEffect(() => {
		document.addEventListener('themeupdate', forceUpdate);
		return () => {
			document.removeEventListener('themeupdate', forceUpdate);
		}
	}, []);

	const setCurrentTheme = (theme: SelectedTheme) => {
		if (getSelectedTheme() !== theme) {
			localStorage.setItem('theme', theme);
			update();
			document.dispatchEvent(new Event('themeupdate'));
		}
	}

	return {
		realTheme: getRealTheme(),
		selectedTheme: getSelectedTheme(),
		setTheme: setCurrentTheme
	}

}

const cssColorToHex = (col: string) => {

	const color = parseCSSColor(col);
	if (!color) return '';

	const redHex = color.values[0].toString(16).padStart(2, '0')
    const greenHex = color.values[1].toString(16).padStart(2, '0')
    const blueHex = color.values[2].toString(16).padStart(2, '0')

    // Convert alpha to a hexadecimal format (assuming it's already a decimal value in the range [0, 1])
    const alphaHex = color.alpha ? ''
      : Math.round(color.alpha * 255)
          .toString(16)
          .padStart(2, '0')
		  

	return '#' + [redHex, greenHex, blueHex, alphaHex].join('')
	  
}

const update = () => {
	const themeStr = getRealTheme();
	
	if (themeStr === 'dark') {
		document.documentElement.dataset.dark = '1';
		delete document.documentElement.dataset.light;
	} else {
		document.documentElement.dataset.light = '1';
		delete document.documentElement.dataset.dark;
	}



	Telegram.WebApp.setHeaderColor(cssColorToHex(theme[`${themeStr}HeaderColor`]));
	Telegram.WebApp.setBottomBarColor(cssColorToHex(theme[`${themeStr}HeaderColor`]));
	Telegram.WebApp.setBackgroundColor(cssColorToHex(theme[`${themeStr}HeaderColor`]));
}

Telegram.WebApp.onEvent('themeChanged', update);

const useTheme = Object.assign(useThemeBase, {
	update
})

export default useTheme;