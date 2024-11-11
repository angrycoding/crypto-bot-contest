declare const Telegram: {
	WebApp: {
		initData: string,
		colorScheme: string
		close: () => void,
		switchInlineQuery: (...args: any[]) => void
		setHeaderColor: (color: string) => void
		setBottomBarColor: (color: string) => void
		setBackgroundColor: (color: string) => void
		onEvent: (event: string, handler: (...args: any[]) => void) => void
		ready: () => void
		disableVerticalSwipes: () => void,
		expand: () => void
		openLink: (link: string) => void
		openTelegramLink: (link: string) => void
		MainButton: {
			show: () => void,
			hide: () => void,
			disable: () => void,
			enable: () => void,
			showProgress: () => void,
			hideProgress: () => void,
			setText: (text: string) => void
		}
		SecondaryButton: {
			show: () => void,
			hide: () => void,
			setText: (text: string) => void,
			setParams: (...args: any[]) => void
		}
		BackButton: {
			show: () => void
			hide: () => void
		}
	}
}