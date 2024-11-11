import React, { useEffect } from "react";

Telegram.WebApp.onEvent('backButtonClicked', () => {
	const lastInstance = instances[instances.length - 1];
	if (lastInstance instanceof BackButton) {
		lastInstance.props.onClick?.();
	}
});

const instances: BackButton[] = [];

class BackButton extends React.Component<{ onClick?: () => void }> {

	componentDidMount() {
		instances.push(this);
		Telegram.WebApp.BackButton.show();
	}

	componentWillUnmount(): void {
		const index = instances.indexOf(this);
		if (index !== -1) instances.splice(index, 1);
		if (!instances.length) {
			Telegram.WebApp.BackButton.hide();
		}
	}

	render() {
		return <></>
	}

}


export default BackButton;