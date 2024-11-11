const formatItems = (items: number): string => {
	return Intl.NumberFormat('en', { notation: 'compact' }).format(items);
}

export default formatItems;