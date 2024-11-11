import React from "react";

const instances: BottomButtons[] = [];

Telegram.WebApp.onEvent('mainButtonClicked', () => {
	const lastInstance = instances[instances.length - 1];
	if (lastInstance instanceof BottomButtons) {
		const { primaryButton, onPrimaryButtonClick } = lastInstance.props;
		if (primaryButton && onPrimaryButtonClick) {
			onPrimaryButtonClick();
		}
	}
});

Telegram.WebApp.onEvent('secondaryButtonClicked', () => {
	const lastInstance = instances[instances.length - 1];
	if (lastInstance instanceof BottomButtons) {
		const { secondaryButton, onSecondaryButtonClick } = lastInstance.props;
		if (secondaryButton && onSecondaryButtonClick) {
			onSecondaryButtonClick();
		}
	}
});

interface Props {
	primaryButton?: string,
	secondaryButton?: string,
	primaryButtonLoading?: boolean
	primaryButtonDisabled?: boolean;
	onPrimaryButtonClick?: () => void,
	onSecondaryButtonClick?: () => void
}

class BottomButtons extends React.Component<Props> {

	componentDidMount() {
		instances.push(this);
		this.recalc();
	}

	recalc = () => {
		const { primaryButton, secondaryButton, primaryButtonLoading, primaryButtonDisabled } = this.props;
		
		if (primaryButton) {
			Telegram.WebApp.MainButton.show();
			Telegram.WebApp.MainButton.setText(primaryButton);
			if (primaryButtonLoading) {
				Telegram.WebApp.MainButton.showProgress();
			} else {
				Telegram.WebApp.MainButton.hideProgress();
			}
			if (primaryButtonDisabled) {
				Telegram.WebApp.MainButton.disable();
			} else {
				Telegram.WebApp.MainButton.enable();
			}
		} else {
			Telegram.WebApp.MainButton.hide();
		}

		if (secondaryButton) {
			Telegram.WebApp.SecondaryButton.show();
			Telegram.WebApp.SecondaryButton.setText(secondaryButton);
			Telegram.WebApp.SecondaryButton.setParams({ position: 'bottom' })
		} else {
			Telegram.WebApp.SecondaryButton.hide();
		}

	}

	componentDidUpdate(prevProps: Props): void {
		if (prevProps.primaryButton !== this.props.primaryButton ||
			prevProps.secondaryButton !== this.props.secondaryButton ||
			prevProps.primaryButtonLoading !== this.props.primaryButtonLoading ||
			prevProps.primaryButtonDisabled !== this.props.primaryButtonDisabled
		) {
			this.recalc();
		}
	}

	componentWillUnmount(): void {
		const index = instances.indexOf(this);
		if (index !== -1) instances.splice(index, 1);
		const lastInstance = instances[instances.length - 1];
		if (lastInstance) {
			lastInstance.recalc();
		} else {
			Telegram.WebApp.MainButton.hide();
			Telegram.WebApp.SecondaryButton.hide();
		}
	}

	render() {
		return <></>
	}

}


export default BottomButtons;