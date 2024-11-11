const getNonEmptyString = (value: any): string => {
	if (typeof value === 'string' && value.trim()) {
		return value.trim();
	}
	return '';
}

export default getNonEmptyString;